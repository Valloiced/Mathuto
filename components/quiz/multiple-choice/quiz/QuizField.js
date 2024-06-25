import React, { useState, useRef, useReducer, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, Text } from 'react-native';

import useSound from '../../../../hooks/useSound';

import reducer from './utils/quiz-reducer.utils';
import initialState from './utils/quiz-state.utils';

import MultipleChoiceBG from '../../../../assets/bg/multiple-choice-bg.png';

import QuizCard from './QuizCard';
import QuizChoices from './QuizChoices';
import QuizTimer from './QuizTimer';

import { COLORS, FONT, SIZES } from '../../../../constants/theme';

export default function QuizField({ quizData, quizStatus, setQuizStatus }) {
    const { sounds, playSound } = useSound();
    const [state, dispatch] = useReducer(reducer, initialState);

    const timerInterval = useRef(null);
    const [timer, setTimer] = useState(0);

    const [answerStatus, setAnswerStatus] = useState({
        isAnswered: false,
        isCorrect: false
    });

    /* Setup */
    useEffect(() => {
        dispatch({ type: 'RESET' });
        dispatch({ type: 'SETUP', data: quizData.questions });

        timerInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1200);

        return () => clearInterval(timerInterval.current);
    }, [quizData]);

    /* End of Question Tracker */
    useEffect(() => {
        let nextLevelTimeout;

        if (answerStatus.isAnswered && !quizStatus.isCompleted) {
            nextLevelTimeout = setTimeout(() => {
                setAnswerStatus({
                    isAnswered: false,
                    isCorrect: false
                });
                dispatch({ type: 'NEXT_LEVEL', data: quizData.questions });
            }, 2500);
        }

        return () => clearTimeout(nextLevelTimeout);
    }, [answerStatus.isAnswered, quizData, quizStatus.isCompleted]);

    /* End of Quiz Tracker */
    useEffect(() => {
        if (
            state.questionNum >= quizData.details.numOfQuestions - 1 &&
            answerStatus.isAnswered &&
            !quizStatus.isCompleted
        ) {
            clearInterval(timerInterval.current);

            // Prevent abrupt completion
            setTimeout(() => {
                setQuizStatus({
                    isCompleted: true,
                    quizStats: { ...state, timeTaken: timer }
                });
            }, 2500);
        }
    }, [timer, answerStatus.isAnswered, quizData, quizStatus.isCompleted, setQuizStatus, state]);

    const handleAnswer = (answer) => {
        let isCorrect;

        const { correctAnswer } = state.currentQuestion;

        if (answer === correctAnswer) {
            dispatch({ type: 'CORRECT_ANSWER', answer: answer });
            isCorrect = true;

            playSound(sounds.achievementLow);
        } else {
            dispatch({ type: 'WRONG_ANSWER', answer: answer });
            isCorrect = false;

            playSound(sounds.lose);
        }

        setAnswerStatus({
            isAnswered: true,
            isCorrect: isCorrect
        });
    };

    return (
        <>
            <ImageBackground
                source={MultipleChoiceBG}
                style={styles.quizBackgroundWrapper}
                imageStyle={styles.quizBackground}
            >
                <QuizTimer timer={timer} />
                <View style={styles.quizTracker}>
                    <Text style={styles.quizTrackerText}>Question {state.questionNum + 1}</Text>
                </View>
                <QuizCard
                    question={state.currentQuestion?.question}
                    questionNum={state.questionNum}
                    questionCount={quizData.details?.numOfQuestions}
                    correctAnswers={state.correctAnswers}
                    incorrectAnswers={state.incorrectAnswers}
                />
            </ImageBackground>
            <QuizChoices
                correctAnswer={state.correctAnswer}
                choosenAnswer={state.choosenAnswer}
                choices={state.currentChoices}
                answerStatus={answerStatus}
                handleAnswer={handleAnswer}
            />
        </>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    quizBackgroundWrapper: {
        width: '100%',
        height: height * 0.45,
        resizeMode: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    quizBackground: {
        width: '100%',
        height: '100%'
    },
    quizTracker: {
        paddingVertical: SIZES.small
    },
    quizTrackerText: {
        color: COLORS.white,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge,
        letterSpacing: 1
    }
});
