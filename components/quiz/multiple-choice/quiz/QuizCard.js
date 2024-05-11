import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';

import QuizProgressBar from './QuizProgressBar';

export default function QuizCard({
    question,
    questionNum,
    questionCount,
    correctAnswers,
    incorrectAnswers
}) {
    return (
        <View style={[styles.quizCard, SHADOWS.medium]}>
            <View style={styles.scoreTracker}>
                <View style={styles.scoreTrackerWrapper}>
                    <View style={styles.scoreTrackerIcon('#1C9336')} />
                    <Text style={styles.scoreTrackerText('#1C9336')}>{correctAnswers}</Text>
                </View>
                <View style={styles.scoreTrackerWrapper}>
                    <Text style={styles.scoreTrackerText('#F87662')}>{incorrectAnswers}</Text>
                    <View style={styles.scoreTrackerIcon('#F87662')} />
                </View>
            </View>
            <QuizProgressBar questionNum={questionNum + 1} questionCount={questionCount} />
            <Text style={styles.quizQuestion}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    quizCard: {
        width: '90%',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.medium,
        marginBottom: -SIZES.xxLarge * 1.25,
        borderRadius: BORDER_RADIUS.medium
    },
    quizQuestion: {
        textAlign: 'center',
        marginVertical: SIZES.xxLarge,
        marginHorizontal: SIZES.medium,
        color: COLORS.textPrimary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.medium - 2
    },
    scoreTracker: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scoreTrackerWrapper: {
        flexDirection: 'row',
        gap: SIZES.small,
        alignItems: 'center',
        marginVertical: SIZES.xxSmall
    },
    scoreTrackerIcon: (color) => ({
        width: 15,
        height: 15,
        backgroundColor: color,
        borderRadius: BORDER_RADIUS.large
    }),
    scoreTrackerText: (color) => ({
        color: color,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small
    })
});
