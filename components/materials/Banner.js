import React from 'react';
import { ImageBackground, Image, Text } from 'react-native';

import banner from '../../assets/bg/materials-banner-bg.png';
import logo from '../../assets/logo.png';

import styles from './style/banner.style';

export default function Banner() {
    return (
        <ImageBackground
            source={banner}
            style={styles.banner}
            imageStyle={styles.bannerImg}
        >
            <Image source={logo} resizeMode="cover" />
            <Text style={styles.bannerHeader}>Learning Materials</Text>
        </ImageBackground>
    );
}
