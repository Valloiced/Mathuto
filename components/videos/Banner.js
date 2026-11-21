import React from 'react';
import { ImageBackground, Text } from 'react-native';

import banner from '../../assets/bg/videos-banner-bg.png';

import styles from './style/banner.style';

export default function Banner() {
    return (
        <ImageBackground
            source={banner}
            resizeMode="cover"
            style={styles.banner}
            imageStyle={{ width: '100%' }}
        >
            <Text style={styles.bannerHeader}>{'VIDEO\nCOURSES'}</Text>
        </ImageBackground>
    );
}
