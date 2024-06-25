import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import styles from './style/description.style';

import EdgeBgDefault from '../../../assets/bg/video-edge-bg-default.png';
import EdgeBgRed from '../../../assets/bg/video-edge-bg-red.png';

export default function Description({ description }) {
    const [theme, changeTheme] = useTheme();

    return (
        <View style={styles.descriptionContainer}>
            <ImageBackground
                source={theme === 'default' ? EdgeBgDefault : EdgeBgRed}
                style={styles.edgeBg}
                imageStyle={styles.edgeBgImage}
            >
                <Text style={styles.descriptionHeader}>Description</Text>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <View style={styles.description}>
                    <Text style={styles.content}>{description}</Text>
                </View>
            </View>
        </View>
    );
}
