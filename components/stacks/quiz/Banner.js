import React from 'react';
import { View, Text, Image } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import BannerImg from '../../../assets/bg/quiz-banner-bg.png';

import getStyles from './style/banner.style';


export default function Banner() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.quizTimeText}>QUIZ TIME</Text>
            <View style={styles.bannerImgWrapper}>
                <Image style={styles.bannerImg} source={BannerImg} />
            </View>
        </View>
    );
}
