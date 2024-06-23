import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import QuizProgressBar from './QuizProgressBar';

import { Search } from '../../../../assets/icons';
import { BORDER_RADIUS, COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';

export default function QuizCard({ category, question, questionNum, questionCount }) {
    return (
        <View style={[styles.quizCard, SHADOWS.medium]}>
            <View style={styles.quizTracker}>
                <Text style={styles.quizTrackerText}>Question {questionNum + 1}</Text>
            </View>
            <QuizProgressBar questionNum={questionNum + 1} questionCount={questionCount} />
            <Text style={styles.quizQuestion}>{question}</Text>
            <View style={styles.categoryWrapper}>
                <Search style={styles.categoryIcon} />
                <Text style={styles.category}>{category}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    quizCard: {
        width: '90%',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderRadius: BORDER_RADIUS.medium
    },
    quizQuestion: {
        textAlign: 'center',
        marginVertical: SIZES.xxLarge,
        marginHorizontal: SIZES.medium,
        color: COLORS.textPrimary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.medium
    },
    quizTracker: {
        paddingVertical: SIZES.small
    },
    quizTrackerText: {
        color: COLORS.tertiary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge,
        letterSpacing: 1
    },
    categoryWrapper: {
        width: '100%',
        marginTop: SIZES.xLarge,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.small
    },
    categoryIcon: {
        color: COLORS.textSecondary + '80',
        fontSize: SIZES.medium
    },
    category: {
        width: '90%',
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.xSmall
    }
});
