import React from 'react';
import { View, Image } from 'react-native';

import LogoDefault from '../../assets/logo-default.png';
import LogoRed from '../../assets/logo-red.png';

import getStyles from './style/banner.style';

import useTheme from '../../hooks/useTheme';

export default function Banner() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    return (
        <View style={styles.banner}>
            <View style={styles.bannerImgWrapper}>
                <Image 
                    source={theme === 'default' ? LogoDefault : LogoRed} 
                    style={styles.bannerImg}
                    resizeMode="contain" 
                />
            </View>
        </View>
    );
}
