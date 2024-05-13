import React, { useState, useEffect } from 'react';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import useProfile from '../../../hooks/useProfile';

import styles from '../../../components/stacks/quiz/style/quiz.style';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import Banner from '../../../components/stacks/quiz/Banner';
import QuizContainer from '../../../components/stacks/quiz/QuizContainer';
import QuizModal from '../../../components/stacks/quiz/QuizModal';

export default function QuizLobby() {
    const user = useProfile();
    const params = useGlobalSearchParams();

    const [userSessions, setUserSessions] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [openedQuiz, setOpenedQuiz] = useState({});

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { topic_id } = params;
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/quiz/${topic_id}?uid=${user.uid}`
                );

                if (response.data.quizzes) {
                    setQuizzes(response.data.quizzes);
                }

                if (response.data.recentSessions) {
                    setUserSessions(response.data.recentSessions);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user.uid && !quizzes.length) {
            fetchQuizzes();
        }
    }, [params, user, quizzes.length]);

    const handleCardPress = (id) => {
        const pressedCardDetails = quizzes.find((quiz) => quiz.id === id);
        const userSessionInDetails = userSessions.find((session) => session.quizId === id);

        setOpenedQuiz({ ...pressedCardDetails, session: userSessionInDetails });
        setModalVisible(true);
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: '',
                    headerLeft: ReturnHeaderBtn
                }}
            />
            <ScrollView style={styles.quizLobbyContainer}>
                <Banner />
                <QuizContainer
                    loading={loading}
                    quizzes={quizzes}
                    handleCardPress={handleCardPress}
                />
            </ScrollView>
            <QuizModal
                topicId={params.topic_id}
                openedQuiz={openedQuiz}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
