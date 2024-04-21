import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence
} from 'react-native-reanimated';

import { SIZES, COLORS } from '../../../../constants/theme';

export default function GameProgressBar({ reset, showProgressBar, duration }) {
    const progressBarWidth = useSharedValue(100);

    useEffect(() => {
        const animateBar = () => {
            progressBarWidth.value = withSequence(
                withTiming(100, { duration: 300, easing: Easing.linear }), // For resetting width
                withTiming(0, {
                    duration: duration - 300,
                    easing: Easing.linear
                }) // Timer
            );
        };

        animateBar();
    }, [duration, reset, progressBarWidth]);

    const progressBarAnimation = useAnimatedStyle(() => ({
        width: `${progressBarWidth.value}%`,
        backgroundColor: `${progressBarWidth.value > 50 ? COLORS.white : '#F87662'}`
    }));

    return (
        <>
            {showProgressBar && (
                <View style={styles.flipIntervalContainer}>
                    <Animated.View
                        style={[styles.flipInterval, progressBarAnimation]}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    flipIntervalContainer: {
        marginTop: SIZES.medium,
        width: '100%',
        backgroundColor: COLORS.textTertiary,
        borderRadius: 20
    },
    flipInterval: {
        borderRadius: 20,
        padding: SIZES.xxSmall * 0.5
    }
});
