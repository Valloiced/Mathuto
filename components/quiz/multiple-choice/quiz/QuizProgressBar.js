import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function QuizProgressBar({ questionNum, questionCount }) {
    const progressBarWidth = useSharedValue(0);

    useEffect(() => {
        const animateBar = () => {
            const fullBarWidth = 100;
            const sections = fullBarWidth / questionCount;

            progressBarWidth.value = withSpring(sections * questionNum, { duration: 1000 });
        };

        animateBar();
    }, [questionNum, progressBarWidth, questionCount]);

    const progressBarAnimation = useAnimatedStyle(() => ({
        width: `${progressBarWidth.value}%`
    }));

    return (
        <View style={styles.quizProgressBarContainer}>
            <View style={styles.quizProgressBarWrapper}>
                <Animated.View style={[styles.quizProgressBar, progressBarAnimation]} />
            </View>
            <Text style={styles.scoreTracker}>
                {questionNum}/{questionCount}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    quizProgressBarContainer: {
        flexDirection: 'row',
        gap: SIZES.small
    },
    quizProgressBarWrapper: {
        width: '90%',
        backgroundColor: COLORS.textSecondary + '26',
        borderRadius: BORDER_RADIUS.medium
    },
    quizProgressBar: {
        width: '50%',
        paddingVertical: SIZES.xxSmall * 0.7,
        backgroundColor: COLORS.tertiary,
        borderRadius: BORDER_RADIUS.medium
    },
    scoreTracker: {
        color: COLORS.tertiary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xSmall
    }
});
