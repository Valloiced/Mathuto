import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../../hooks/useNetStatus';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import VideoPlayer from '../../../components/stacks/video/VideoPlayer';
import Description from '../../../components/stacks/video/Description';
import YTOfflineModal from '../../../components/stacks/video/YTOfflineModal';

import styles from '../../../components/stacks/video/style/video.style';
import { getVideoDetails, getChannelDetails } from '../../../utils/youtube.utils';

export default function Video() {
    // params: [videoType, videoId]
    const params = useLocalSearchParams();
    const { isConnected } = useNetStatus();

    const [videoType, videoId] = params.slug;

    const [videoDetails, setVideoDetails] = useState({});
    const [embeddedLink, setEmbeddedLink] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoData = await getVideoDetails(videoId, 'snippet,statistics,player');

                const channelData = await getChannelDetails(videoData.snippet.channelId);

                setVideoDetails({
                    video: videoData,
                    channel: channelData
                });

                const embeddedHtml = videoData.player.embedHtml;
                const matchLink = /(?:src=")(.*?)(?:".)/;
                const link = embeddedHtml.match(matchLink)[1];

                setEmbeddedLink('https:' + link);
            } catch (error) {
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'Missing Credentials',
                    text2: 'Please fill in the login form to continue',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            }
        };

        if (videoId && isConnected) {
            fetchVideoData();
        }

        if (isConnected === false) {
            setModalVisible(true);
        }
    }, [videoId, isConnected]);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: '',
                    headerLeft: ReturnHeaderBtn,
                    headerTransparent: true
                }}
            />
            <ScrollView style={styles.videoContainer}>
                <VideoPlayer
                    id={videoId}
                    embeddedPlayer={embeddedLink}
                    title={videoDetails.video && videoDetails.video.snippet.title}
                    viewCount={videoDetails.video && videoDetails.video.statistics.viewCount}
                    publishedAt={videoDetails.video && videoDetails.video.snippet.publishedAt}
                    channelName={videoDetails.channel && videoDetails.channel.snippet.title}
                    channelImg={
                        videoDetails.channel && videoDetails.channel.snippet.thumbnails.high.url
                    }
                />
                <Description
                    description={videoDetails.video && videoDetails.video.snippet.description}
                />
            </ScrollView>
            <YTOfflineModal
                currentPath={`/stacks/video/${videoType}/${videoId}`}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
