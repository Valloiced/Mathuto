import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import useProfile from '../../../hooks/useProfile';
import useNetStatus from '../../../hooks/useNetStatus';

import styles from './style/quizButton.style';
import { SHADOWS } from '../../../constants/theme';
import { router } from 'expo-router';

export default function QuizButton({ topic_id }) {
    const { isConnected } = useNetStatus();
    const user = useProfile();

    const handlePress = () => {
        if (isConnected && user.uid) {
            router.push(`/stacks/quiz/${topic_id}`);
        } else if (!user.uid) {
            Toast.show({
                type: 'error',
                text1: 'You must be logged in to take quizzes',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'You are offline.',
                text2: 'Check your network connection.',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    };

    return (
        <View style={styles.gameButtonContainer}>
            <TouchableOpacity style={[styles.gameButton, SHADOWS.medium]} onPress={handlePress}>
                <Text style={styles.gameButtonText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}
