import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './style/description.style';

import edgeBg from '../../../assets/bg/video-edge-bg.png';

export default function Description({ description }) {
    return (
        <View style={styles.descriptionContainer}>
            <ImageBackground source={edgeBg} style={styles.edgeBg} imageStyle={styles.edgeBgImage}>
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
