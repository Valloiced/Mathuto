import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar, ScrollView } from 'react-native';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import VideoPlayer from '../../../components/stacks/video/VideoPlayer';
import Description from '../../../components/stacks/video/Description';

import styles from '../../../components/stacks/video/style/video.style';
import {
    getVideoDetails,
    getChannelDetails
} from '../../../utils/youtube.utils';

export default function Video() {
    // params: [videoType, videoId]
    const params = useLocalSearchParams();
    const [videoType, videoId] = params.slug;

    const [videoDetails, setVideoDetails] = useState({});
    const [embeddedLink, setEmbeddedLink] = useState('');

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videoData = await getVideoDetails(
                    videoId,
                    'snippet,statistics,player'
                );

                const channelData = await getChannelDetails(
                    videoData.snippet.channelId
                );

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
            }
        };

        if (videoId) {
            fetchVideoData();
        }
    }, [videoId]);

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="transparent"
            />
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
                    title={
                        videoDetails.video && videoDetails.video.snippet.title
                    }
                    viewCount={
                        videoDetails.video &&
                        videoDetails.video.statistics.viewCount
                    }
                    publishedAt={
                        videoDetails.video &&
                        videoDetails.video.snippet.publishedAt
                    }
                    channelName={
                        videoDetails.channel &&
                        videoDetails.channel.snippet.title
                    }
                    channelImg={
                        videoDetails.channel &&
                        videoDetails.channel.snippet.thumbnails.high.url
                    }
                />
                <Description
                    description={
                        videoDetails.video &&
                        videoDetails.video.snippet.description
                    }
                />
            </ScrollView>
        </>
    );
}
