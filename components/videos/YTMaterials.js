import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNetInfo } from '@react-native-community/netinfo';

import useTheme from '../../hooks/useTheme';

import { getChannelDetails, getVideoDetails, searchVideosList } from '../../utils/youtube.utils';

import getStyles from './style/ytMaterials.style';

import YTMaterialsCard from './YTMaterialsCard';
import { COLORS, COLORS_RED } from '../../constants/theme';

export default function YTMaterials() {
    const netinfo = useNetInfo();
    const [theme] = useTheme(); // Assuming `useTheme` provides a single value now

    const styles = getStyles(theme);

    const [searchData, setSearchData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchRecentOpenedLessons = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-lessons');
            const recentLessons = JSON.parse(response);
            return recentLessons ? recentLessons.map(lesson => lesson.name) : [];
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };

    const fetchRecentSavedData = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-yt-data');
            const recentYTData = JSON.parse(response);
            return recentYTData || [];
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };

    const checkAllowSearch = async () => {
        try {
            const response = await AsyncStorage.getItem('saved-yt-queries');
            const latestQueries = JSON.parse(response);

            if (!latestQueries || !latestQueries.videoData.length) {
                return true;
            }

            if (latestQueries.fetchDate) {
                const currentTime = new Date();
                const prevSearchTime = new Date(latestQueries.fetchDate);
                const differenceInDays = (currentTime - prevSearchTime) / (1000 * 3600 * 24);

                return differenceInDays >= 1;
            }
            return false;
        } catch (error) {
            console.error(error.message);
            return false;
        }
    };

    const getRandomVideos = (queries, limit) => {
        if (limit > queries.length) limit = queries.length;

        const videos = [];
        const usedIndices = new Set();

        while (videos.length < limit) {
            const pickIndex = Math.floor(Math.random() * queries.length);

            if (!usedIndices.has(pickIndex)) {
                videos.push(queries[pickIndex]);
                usedIndices.add(pickIndex);
            }
        }

        return videos;
    };

    const searchRecommendations = useCallback(async () => {
        const defaultValues = 'mathematics,arithmetic';

        try {
            const isSearchAvailable = await checkAllowSearch();
            let videoList;

            let searchTerms = await fetchRecentOpenedLessons();
            searchTerms = searchTerms.length > 0 ? searchTerms.join(',') : '';

            if (isSearchAvailable) {
                videoList = await searchVideosList(
                    `${defaultValues}${searchTerms ? ',' + searchTerms : ''}`,
                    200
                );

                if (!videoList.length) {
                    videoList = await searchVideosList(defaultValues, 200);
                    await AsyncStorage.removeItem('recent-lessons');
                }

                const latestQueries = {
                    fetchDate: new Date(),
                    videoData: videoList
                };

                await AsyncStorage.setItem('saved-yt-queries', JSON.stringify(latestQueries));
            } else {
                const response = await AsyncStorage.getItem('saved-yt-queries');
                const storedVideoData = JSON.parse(response);
                videoList = storedVideoData.videoData;
            }

            const pickedVideos = getRandomVideos(videoList, 20);

            const videoListDetails = await Promise.all(
                pickedVideos.map(async (video) => {
                    const channelImg = await getChannelDetails(video.snippet.channelId, 'snippet');
                    const videoDetails = await getVideoDetails(video.id.videoId, 'snippet,statistics');

                    return {
                        ...video,
                        channelImg: channelImg?.snippet?.thumbnails?.medium?.url || null,
                        viewCount: videoDetails?.statistics?.viewCount || '0'
                    };
                })
            );

            await AsyncStorage.setItem('recent-yt-data', JSON.stringify(videoListDetails));

            setSearchData(videoListDetails);
        } catch (error) {
            console.error(error.message);
            setError('Cannot load videos yet.');
            Toast.show({
                type: 'error',
                text1: 'Cannot load videos yet',
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const renderSavedRecommendation = useCallback(async () => {
        try {
            const savedYtData = await fetchRecentSavedData();
            if (savedYtData.length) {
                setSearchData(savedYtData);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'You are offline',
                    text2: 'You need connection to load videos',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 5000
                });
            }
        } catch (error) {
            console.error(error);
            setError('No videos saved yet');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (netinfo.isConnected === false) {
            renderSavedRecommendation();
        } else if (netinfo.isConnected) {
            searchRecommendations();
        }
    }, [netinfo.isConnected, searchRecommendations, renderSavedRecommendation]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        if (netinfo.isConnected === false) {
            renderSavedRecommendation();
        } else {
            searchRecommendations();
        }
        setRefreshing(false);
    }, [netinfo.isConnected, searchRecommendations, renderSavedRecommendation]);

    return (
        <View style={styles.ytMaterialContainer}>
            <View style={styles.ytHeaderWrapper}>
                <Text style={styles.ytHeader}>RECOMMENDED FOR YOU</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={theme === 'default' ? COLORS.textTertiary : COLORS_RED.base} />
            ) : (
                <FlatList
                    data={searchData}
                    horizontal={true}
                    keyExtractor={(item) => item.id.videoId}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            )}
            {!loading && error && <Text>{error}</Text>}
        </View>
    );
}
