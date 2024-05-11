import React from 'react';
import { View, Text, Image } from 'react-native';

import BannerImg from '../../../assets/bg/quiz-banner-bg.png';

import styles from './style/banner.style';

export default function Banner() {
    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.quizTimeText}>QUIZ TIME</Text>
            <View style={styles.bannerImgWrapper}>
                <Image style={styles.bannerImg} source={BannerImg} />
            </View>
        </View>
    );
}
