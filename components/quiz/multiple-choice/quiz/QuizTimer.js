import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

import { formatTime } from './utils/quiz.utils';

import { Clock } from '../../../../assets/icons';

export default function QuizTimer({ timer }) {
    return (
        <View style={styles.quizTimerContainer}>
            <Clock style={styles.timerIcon} />
            <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    quizTimerContainer: {
        position: 'absolute',
        flexDirection: 'column',
        top: SIZES.xxLarge,
        alignItems: 'center',
        alignSelf: 'center',
        gap: SIZES.xxSmall * 0.5
    },
    timerIcon: {
        color: COLORS.white,
        fontSize: SIZES.medium
    },
    timer: {
        color: COLORS.white,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    }
});
