import React from 'react';
import { View, Text, Image } from 'react-native';

import useTheme from '../../hooks/useTheme';

import IconMDefault from '../../assets/icon-m-default.png';
import IconMRed from '../../assets/icon-m-red.png';

import styles from './style/appInfo.style';

export default function AppInfo() {
    const [theme, changeTheme] = useTheme();

    return (
        <View style={styles.appInfoContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={theme === 'default' ? IconMDefault : IconMRed}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.version}>1.0.0</Text>
        </View>
    );
}
