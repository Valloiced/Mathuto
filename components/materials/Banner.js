import React from 'react';
import { ImageBackground, Image, Text, View } from 'react-native';

import useTheme from '../../hooks/useTheme';

import banner from '../../assets/bg/materials-banner-bg.png';

import LogoDefault from '../../assets/logo-default.png';
import LogoRed from '../../assets/logo-red.png';

import getStyles from './style/banner.style';

export default function Banner() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    
    return (
        <ImageBackground 
            source={banner} 
            style={styles.banner} 
            imageStyle={styles.bannerImg}
        >
            <View style={styles.logoWrapper}>
                <Image
                    style={styles.logo}
                    source={theme === 'default' ? LogoDefault : LogoRed} 
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.bannerHeader}>Learning Materials</Text>
        </ImageBackground>
    );
}
