import React, { useState, useEffect } from 'react';
import { Stack, router, useGlobalSearchParams } from 'expo-router';
import { View, StatusBar } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import styles from '../../../components/quiz/multiple-choice/style/quiz.style';

import QuizField from '../../../components/quiz/multiple-choice/quiz/QuizField';
import QuizResult from '../../../components/quiz/multiple-choice/quiz/QuizResult';
import QuizLoading from '../../../components/quiz/multiple-choice/quiz/QuizLoading';
import RetakeDialog from '../../../components/common/dialogs/RetakeDialog';

export default function MultipleChoiceQuiz() {
    const params = useGlobalSearchParams();
    const [topic_id, quiz_id] = params.ids;

    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh talaga

    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    const [quizStatus, setQuizStatus] = useState({
        isCompleted: false,
        quizStats: {}
    });

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/quiz/${topic_id}?quiz_id=${quiz_id}`
                );

                if (response.data) {
                    setQuizData(response.data);
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.',
                    text2: error.message,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
                router.back();
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [topic_id, quiz_id]);

    const handleRetake = () => {
        const callback = (value) => {
            if (value) {
                router.replace(`/quiz/multiple-choice/${params.quiz_id}`);
            }
        };

        setDialogCallback(() => callback);
        setModalVisible(true);
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={styles.quizContainer}>
                {loading ? (
                    <QuizLoading />
                ) : !quizStatus.isCompleted ? (
                    <QuizField
                        quizData={quizData}
                        quizStatus={quizStatus}
                        setQuizStatus={setQuizStatus}
                    />
                ) : (
                    <QuizResult
                        quizId={params.quiz_id}
                        quizDetails={quizData.details}
                        quizStats={quizStatus.quizStats}
                        handleRetake={handleRetake}
                    />
                )}
                <RetakeDialog
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    dialogCallback={dialogCallback}
                    setDialogCallback={setDialogCallback}
                />
            </View>
        </>
    );
}
