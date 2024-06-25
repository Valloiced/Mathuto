import React from 'react';
import { router } from 'expo-router';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import { formatTime } from '../../quiz/multiple-choice/quiz/utils/quiz.utils';

import { Play } from '../../../assets/icons';

import getStyles from './style/quizModal.style';

import { SHADOWS } from '../../../constants/theme';

export default function QuizModal({ topicId, openedQuiz, modalVisible, setModalVisible }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const handleStart = () => {
        setModalVisible(false);
        router.replace(`/quiz/${openedQuiz.type}/${topicId}/${openedQuiz.id}`);
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent
            onRequestClose={() => setModalVisible(false)}
            statusBarTranslucent
        >
            <View style={styles.modalContainer}>
                <View style={styles.quizModalContainer}>
                    <View style={styles.quizHeaderWrapper}>
                        <Text style={styles.quizTitle}>{openedQuiz.title}</Text>
                        <Text style={styles.quizQuestions}>
                            {openedQuiz.numOfQuestions} Questions
                        </Text>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        <Text style={styles.descriptionHeader}>Description</Text>
                        <Text style={styles.description}>{openedQuiz.description}</Text>
                    </View>
                    <View style={styles.currentContainer}>
                        <View style={styles.currentHeaderWrapper}>
                            <Text style={styles.currentHeader}>Current</Text>
                        </View>
                        <View style={styles.currentWrapper}>
                            <Text style={styles.currentLabel}>Time Taken</Text>
                            <Text style={styles.currentDetail}>
                                {!openedQuiz.session
                                    ? '--:--'
                                    : openedQuiz.session?.retake
                                      ? formatTime(openedQuiz.session?.retakeTime)
                                      : formatTime(openedQuiz.session?.time)}
                            </Text>
                        </View>
                        <View style={styles.currentWrapper}>
                            <Text style={styles.currentLabel}>Score</Text>
                            <Text style={styles.currentDetail}>
                                {!openedQuiz.session
                                    ? 'Not Taken Yet'
                                    : openedQuiz.session?.retake
                                      ? `${openedQuiz.session?.retakeScore}/${openedQuiz.numOfQuestions}`
                                      : `${openedQuiz.session?.score}/${openedQuiz.numOfQuestions}`}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.startBtn, SHADOWS.medium]}
                        onPress={handleStart}
                    >
                        <View style={styles.startBtnWrapper}>
                            <Play style={styles.startBtnIcon} />
                            <Text style={styles.startBtnText}>START</Text>
                        </View>
                    </TouchableOpacity>
                    {openedQuiz.session?.score ? (
                        <Text style={styles.retakeIndicator}>
                            ⓘ Retaking this quiz will replace your current score. Previous scores
                            can not be swapped and retrieved.
                        </Text>
                    ) : (
                        <Text style={styles.retakeIndicator}>
                            Your first score would be your original score to be seen by your
                            teacher.
                        </Text>
                    )}
                    <TouchableOpacity style={styles.exitBtn} onPress={() => setModalVisible(false)}>
                        <Text style={styles.exitBtnText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
