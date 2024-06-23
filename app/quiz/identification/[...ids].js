import React, { useState, useEffect } from 'react';
import { Stack, router, useGlobalSearchParams } from 'expo-router';
import { View, StatusBar } from 'react-native';
import axios from 'axios';

import { sampleData, sampleStatus } from '../../../components/quiz/identification/test';

import QuizHeaderLeft from '../../../components/headers/QuizHeaderLeft';
import QuizLoading from '../../../components/quiz/identification/quiz/QuizLoading';
import QuizField from '../../../components/quiz/identification/quiz/QuizField';
import QuizResult from '../../../components/quiz/identification/quiz/QuizResult';
import RetakeDialog from '../../../components/common/dialogs/RetakeDialog';

import styles from '../../../components/quiz/identification/style/quiz.style';

export default function IdentificationQuiz() {
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
    // const [quizStatus, setQuizStatus] = useState(sampleStatus);

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
                router.replace(`/quiz/${quizData.details.type}/${topic_id}/${quiz_id}`);
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
                    headerShown: true,
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerLeft: QuizHeaderLeft
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
                        quizId={quiz_id}
                        quizStats={quizStatus.quizStats}
                        quizDetails={quizData.details}
                        quizQuestions={quizData.questions}
                        handleRetake={handleRetake}
                    />
                )}
            </View>
            <RetakeDialog
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dialogCallback={dialogCallback}
                setDialogCallback={setDialogCallback}
            />
        </>
    );
}
