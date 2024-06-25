import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/quizContainer.style';

import { COLORS, SHADOWS } from '../../../constants/theme';

export default function QuizContainer({ loading, quizzes, handleCardPress }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const renderQuizzes = quizzes.map((quiz) => {
        var formatType = quiz.type
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return (
            <TouchableOpacity
                key={quiz.id}
                style={[styles.quizCard, SHADOWS.medium]}
                onPress={() => handleCardPress(quiz.id)}
            >
                <Text style={styles.quizCardTitle}>{quiz.title}</Text>
                <Text style={styles.quizCardQuestions}>{quiz.numOfQuestions} Questions</Text>
                <Text style={styles.quizCardType}>{formatType}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.quizContainer}>
            <Text style={styles.quizIndicator}>ⓘ AVAILABLE QUIZZES</Text>
            <View style={styles.quizWrapper}>
                {!quizzes.length ? (
                    <View style={styles.indicatorWrapper}>
                        {loading ? (
                            <ActivityIndicator size="large" color={theme === 'default' ? COLORS.primary : COLORS_RED.primary} />
                        ) : (
                            <Text style={styles.noQuizIndicator}>No Available Quizzes Yet</Text>
                        )}
                    </View>
                ) : (
                    renderQuizzes
                )}
            </View>
        </View>
    );
}
