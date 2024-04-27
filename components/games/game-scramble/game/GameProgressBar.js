import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    Easing,
    cancelAnimation
} from 'react-native-reanimated';

import { BORDER_RADIUS, SHADOWS, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

export default function GameProgressBar({
    levelTheme,
    levelDuration,
    reset,
    isCancelled
}) {
    const progressBarWidth = useSharedValue(100);

    useEffect(() => {
        const animateBar = () => {
            const timerDuration = levelDuration * 1000; // (turn to ms)
            progressBarWidth.value = withSequence(
                withTiming(100, { duration: 300, easing: Easing.linear }), // For resetting width
                withTiming(0, {
                    duration: timerDuration - 300,
                    easing: Easing.linear
                }) // Timer
            );
        };

        if (isCancelled) {
            cancelAnimation(progressBarWidth);
        } else {
            animateBar();
        }
    }, [levelDuration, progressBarWidth, isCancelled, reset]);

    const progressBarAnimation = useAnimatedStyle(() => ({
        width: `${progressBarWidth.value}%`
    }));

    return (
        <View style={[styles.timerBarContainer, SHADOWS.medium]}>
            <Animated.View
                style={[styles.timerBar(levelTheme), progressBarAnimation]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    timerBarContainer: {
        marginVertical: SIZES.xxSmall * 0.5,
        marginHorizontal: SIZES.medium,
        backgroundColor: GameTheme.textColor + 'BF',
        borderRadius: BORDER_RADIUS.large
    },
    timerBar: (levelTheme) => ({
        width: '100%',
        backgroundColor: levelTheme,
        padding: SIZES.xxSmall * 0.3,
        borderRadius: BORDER_RADIUS.xLarge
    })
});
