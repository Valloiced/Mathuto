import React from 'react';
import { View, Image } from 'react-native';

import logo from '../../assets/logo.png';

import styles from './style/banner.style';

export default function Banner() {
    return (
        <View style={styles.banner}>
            <Image source={logo} resizeMode="cover" />
        </View>
    );
}
