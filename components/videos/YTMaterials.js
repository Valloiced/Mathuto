import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import styles from './style/ytMaterials.style';
import YTMaterialsCard from './YTMaterialsCard';
import {
    getChannelDetails,
    getVideoDetails,
    searchVideosList
} from '../../utils/youtube.utils';

export default function YTMaterials() {
    const [searchData, setSearchData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRecentOpenedLessons = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-lessons');
            const recentLessons = JSON.parse(response);
            if (!recentLessons) {
                return [];
            }

            return recentLessons.map((lessons) => lessons.name);
        } catch (error) {
            console.error(error.message);
        }
    };

    const checkAllowSearch = async () => {
        try {
            let response = await AsyncStorage.getItem('saved-yt-queries');
            let latestQueries = JSON.parse(response);

            if (!latestQueries) {
                return true; // Fetch data if there is no queries saved yet
            }

            if (latestQueries.fetchDate) {
                const currentTime = new Date();
                const prevSearchTime = new Date(latestQueries.fetchDate);
                const differenceInTime =
                    prevSearchTime.getTime() - currentTime.getTime();

                const differenceInDays = differenceInTime / (1000 * 3600 * 24);

                return differenceInDays >= 1; // Return true if a day has passed
            } else {
                return false;
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const getRandomVideos = (queries, limit) => {
        const videos = new Set();

        while (videos.size < limit) {
            const pickIndex = Math.floor(Math.random() * queries.length);
            const pickVideo = queries[pickIndex];

            videos.add(pickVideo);
        }

        return Array.from(videos);
    };

    const searchRecommendations = useCallback(async () => {
        const defaultValues = 'mathematics,arithmetic';

        try {
            const isSearchAvailable = await checkAllowSearch();

            let videoList;

            // Check if recent lessons exist and append them to default search terms
            let searchTerms = await fetchRecentOpenedLessons();

            if (searchTerms.length > 0) {
                searchTerms = searchTerms.join(',');
            } else {
                searchTerms = '';
            }

            // The app is limited to one search a day with 200 queries, if a day has passed
            // This condition will fetch new data again and store it to async storage
            if (isSearchAvailable) {
                videoList = await searchVideosList(
                    defaultValues + (searchTerms ? ',' + searchTerms : ''),
                    200
                );

                const latestQueries = {
                    fetchDate: new Date(),
                    videoData: videoList
                };

                await AsyncStorage.removeItem('saved-yt-queries');
                await AsyncStorage.setItem(
                    'saved-yt-queries',
                    JSON.stringify(latestQueries)
                );
            } else {
                let response = await AsyncStorage.getItem('saved-yt-queries');
                const storedVideoData = JSON.parse(response);
                videoList = storedVideoData.videoData;
            }

            // Twenty random videos are pick the stored queries every load
            let pickedVideos = getRandomVideos(videoList, 20);

            const fetchVideoDetails = pickedVideos.map(async (video) => {
                const channelImg = await getChannelDetails(
                    video.snippet.channelId,
                    'snippet'
                );
                const videoDetails = await getVideoDetails(
                    video.id.videoId,
                    'snippet,statistics'
                );

                return {
                    ...video,
                    channelImg: channelImg
                        ? channelImg.snippet.thumbnails.medium.url
                        : null,
                    viewCount: videoDetails.statistics.viewCount
                };
            });

            const videoListDetails = await Promise.all(fetchVideoDetails);

            setSearchData(videoListDetails);
        } catch (error) {
            console.error(error.message);
            Toast.show({
                type: 'error',
                text1: 'Cannot load videos yet',
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, []);

    useEffect(() => {
        searchRecommendations();
    }, [searchRecommendations]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await searchRecommendations();
        setRefreshing(false);
    }, [searchRecommendations]);

    return (
        <View style={styles.ytMaterialContainer}>
            <View style={styles.ytHeaderWrapper}>
                <Text style={styles.ytHeader}>RECOMMENDED FOR YOU</Text>
            </View>
            <FlatList
                data={searchData}
                horizontal={true}
                keyExtractor={(item) => item.id.videoId}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => (
                    <YTMaterialsCard
                        id={item.id.videoId}
                        title={item.snippet.title}
                        thumbnail={item.snippet.thumbnails.medium.url}
                        channelName={item.snippet.channelTitle}
                        channelImg={item.channelImg}
                        viewCount={item.viewCount}
                    />
                )}
            />
        </View>
    );
}
