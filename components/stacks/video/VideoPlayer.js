import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import WebView from 'react-native-webview';

import { formatViews } from '../../../utils/youtube.utils';

import blob1 from '../../../assets/blob/blob1.png';
import blob2 from '../../../assets/blob/blob2.png';

import { YouTube } from '../../../assets/icons';

import styles from './style/videoPlayer.style';
import { SHADOWS } from '../../../constants/theme';

export default function VideoPlayer({
    id,
    embeddedPlayer = '',
    title = '',
    viewCount = 0,
    publishedAt = '',
    channelName = '',
    channelImg = ''
}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleRedirect = () => {
        const ytURL = `https://www.youtube.com/watch?v=${id}`;

        Linking.openURL(ytURL);
    };

    return (
        <View style={styles.videoPlayerContainer}>
            <View style={styles.blob1Wrapper}>
                <ImageBackground source={blob1} style={styles.blob} />
            </View>
            <View style={styles.blob2Wrapper}>
                <ImageBackground source={blob2} style={styles.blob} />
            </View>
            <View style={styles.playerContainer}>
                <WebView
                    originWhitelist={['*']}
                    source={{
                        uri: embeddedPlayer
                    }}
                    style={styles.videoPlayer}
                />
            </View>
            <View style={styles.videoPlayerInfo}>
                <View style={styles.videoMainDetails}>
                    <Text style={styles.videoTitle}>{title}</Text>
                    <View style={styles.mainDetailsWrapper}>
                        <Text
                            style={styles.mainDetails}
                        >{`${formatViews(viewCount)} Views`}</Text>
                        <Text style={styles.mainDetails}>
                            {formatDate(publishedAt)}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.channel}>
                        <View
                            style={[styles.channelImgWrapper, SHADOWS.medium]}
                        >
                            <Image src={channelImg} style={styles.channelImg} />
                        </View>
                        <Text style={styles.channelName}>{channelName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.redirectButton}
                        onPress={handleRedirect}
                    >
                        <Text style={styles.redirectBtnText}>Watch in</Text>
                        <YouTube style={styles.ytIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
