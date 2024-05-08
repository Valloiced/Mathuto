import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import itemBGRed from '../../../assets/bg/material-red.png';

import { COLORS } from '../../../constants/theme';
import styles from './style/detailsContainer.style';

export default function DetailsContainer({ name, creator }) {
    return (
        <ImageBackground
            source={itemBGRed}
            style={styles.detailsContainer}
            imageStyle={styles.detailsBackground}
        >
            <LinearGradient
                colors={[COLORS.gradientWhite, 'transparent']}
                style={styles.itemGradient}
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.detailsWrapper}>
                    <Text style={styles.topicTitle}>{name || '--:--'}</Text>
                    <Text style={styles.creator}>{creator || '--'}</Text>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}
