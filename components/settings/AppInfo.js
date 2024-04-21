import React from 'react';
import { View, Text, Image } from 'react-native';

import MathtutoIcon from '../../assets/icon.png';

import styles from './style/appInfo.style';

export default function AppInfo() {
    return (
        <View style={styles.appInfoContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={MathtutoIcon}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.version}>1.0.0</Text>
        </View>
    );
}
