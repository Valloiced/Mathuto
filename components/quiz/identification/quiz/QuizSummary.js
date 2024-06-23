import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Search, Checkmark } from '../../../../assets/icons';
import { BORDER_RADIUS, COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';

function SummaryCard({ questionNum, category, question, correctAnswer, answerSummary }) {
    return (
        <View style={[styles.questionCard, SHADOWS.small]}>
            <View style={styles.questionCardHeader}>
                <Text style={styles.questionNumber}>Question {questionNum}</Text>
                <View style={styles.categoryWrapper}>
                    <Search style={styles.categoryIcon} />
                    <Text style={styles.category}>{category}</Text>
                </View>
            </View>
            <View style={styles.questionWrapper}>
                <Text style={styles.question}>{question}</Text>
            </View>
            <View style={styles.questionAnswerWrapper}>
                <View style={styles.userAnswerWrapper(answerSummary.isCorrect)}>
                    <View style={styles.userAnswerLabel(answerSummary.isCorrect)}>
                        {answerSummary.isCorrect ? (
                            <Checkmark style={styles.correctAnswerLabelText} />
                        ) : (
                            <Text style={styles.userAnswerLabelText()}>X</Text>
                        )}
                        <Text style={styles.userAnswerLabelText(answerSummary.isCorrect)}>
                            Your Answer
                        </Text>
                    </View>
                    <Text style={styles.userAnswer(answerSummary.isCorrect)}>
                        {answerSummary.userAnswer}
                    </Text>
                </View>
                <View style={styles.correctAnswerWrapper(answerSummary.isCorrect)}>
                    <View style={styles.correctAnswerLabel}>
                        <Checkmark style={styles.correctAnswerLabelText} />
                        <Text style={styles.correctAnswerLabelText}>Corect Answer</Text>
                    </View>
                    <Text style={styles.correctAnswer}>{correctAnswer}</Text>
                </View>
            </View>
            {answerSummary.isCorrect ? (
                <Checkmark style={[styles.correctAnswerLabelText, styles.summaryIndicator]} />
            ) : (
                <Text style={[styles.userAnswerLabelText(), styles.summaryIndicator]}>X</Text>
            )}
        </View>
    );
}

export default function QuizSummary({ quizQuestions, answerSummary }) {
    const summaries = answerSummary.map((summary, index) => {
        const { category, answer, question } = quizQuestions[summary.quizIndex];

        return (
            <SummaryCard
                key={index}
                questionNum={index + 1}
                category={category}
                question={question}
                correctAnswer={answer}
                answerSummary={summary}
            />
        );
    });

    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.summaryHeader}>YOUR SUMMARY</Text>
            {summaries}
        </View>
    );
}

const styles = StyleSheet.create({
    summaryContainer: {
        width: '100%',
        marginVertical: SIZES.small
    },
    summaryHeader: {
        color: COLORS.primary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large,
        marginBottom: SIZES.xLarge,
        marginHorizontal: SIZES.small
    },
    questionCard: {
        flexDirection: 'column',
        marginBottom: SIZES.xxLarge,
        paddingVertical: SIZES.large,
        paddingHorizontal: SIZES.small,
        // borderWidth: 1,
        backgroundColor: COLORS.lightWhite,
        // borderColor: COLORS.textSecondary + '80',
        borderRadius: BORDER_RADIUS.small
    },
    questionCardHeader: {
        flexDirection: 'column',
        gap: SIZES.xxSmall * 0.5
    },
    questionNumber: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: SIZES.xxSmall * 0.5,
        paddingHorizontal: SIZES.small,
        color: COLORS.textPrimary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium,
        borderRadius: BORDER_RADIUS.medium
    },
    categoryWrapper: {
        flexDirection: 'row',
        gap: SIZES.xxSmall,
        marginHorizontal: SIZES.xxSmall
    },
    categoryIcon: {
        fontSize: SIZES.small,
        color: COLORS.textSecondary + 'BF'
    },
    category: {
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.TorLight,
        fontSize: SIZES.xSmall
    },
    questionWrapper: {
        backgroundColor: COLORS.white,
        marginVertical: SIZES.xLarge,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.xxLarge,
        borderRadius: BORDER_RADIUS.small
    },
    question: {
        color: COLORS.textPrimary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    },
    questionAnswerWrapper: {
        flexDirection: 'column',
        gap: SIZES.small
    },
    userAnswerWrapper: (isCorrect) => ({
        flexDirection: 'column',
        gap: SIZES.xxSmall,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: isCorrect ? '#1C9336' : '#F87662',
        borderRadius: BORDER_RADIUS.small
    }),
    userAnswerLabel: (isCorrect) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xxSmall * 0.5
    }),
    userAnswerLabelText: (isCorrect) => ({
        color: isCorrect ? '#1C9336' : '#F87662',
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small
    }),
    userAnswer: (isCorrect) => ({
        color: isCorrect ? '#1C9336' : '#F87662',
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    }),
    correctAnswerWrapper: (isCorrect) => ({
        opacity: isCorrect ? 0 : 1,
        flexDirection: 'column',
        gap: SIZES.xxSmall,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: '#1C9336',
        borderRadius: BORDER_RADIUS.small
    }),
    correctAnswerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xxSmall * 0.5
    },
    correctAnswerLabelText: {
        color: '#1C9336',
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small
    },
    correctAnswer: {
        color: '#1C9336',
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    },
    summaryIndicator: {
        position: 'absolute',
        top: SIZES.large,
        right: SIZES.large,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.xLarge
    }
});
