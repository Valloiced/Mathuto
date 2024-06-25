import React, { useReducer, useRef, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, ImageBackground } from 'react-native';

import IdentificationBG from '../../../../assets/bg/identification-bg.png';

import initialState from './utils/quiz-state.utils';
import reducer from './utils/quiz-reducer.utils';

import QuizCard from './QuizCard';
import QuizTimer from './QuizTimer';
import QuizInput from './QuizInput';

import { COLORS, FONT, SIZES } from '../../../../constants/theme';
import { normalizeAnswer } from './utils/quiz.utils';

export default function QuizField({ quizData, setQuizStatus }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const timerInterval = useRef(null);
    const [timer, setTimer] = useState(0);

    /* Setup */
    useEffect(() => {
        dispatch({ type: 'RESET' });
        dispatch({ type: 'SETUP', data: quizData.questions });

        timerInterval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1200);

        return () => clearInterval(timerInterval.current);
    }, []);

    const handleAnswer = () => {
        if (state.answer === '') {
            return; // do not proceed for no input
        }

        let answer = normalizeAnswer(state.answer);
        let correctAnswer = normalizeAnswer(state.currentQuestion.answer);

        if (answer === correctAnswer) {
            dispatch({ type: 'CORRECT_ANSWER' });
        } else {
            dispatch({ type: 'WRONG_ANSWER' });
        }

        if (state.questionNum === quizData.details.numOfQuestions - 1) {
            clearInterval(timerInterval.current);
            return setTimeout(() => handleFinish(), 500);
        }

        dispatch({ type: 'NEXT_LEVEL', data: quizData.questions });
    };

    const handleFinish = () => {
        // Prevent abrupt completion
        setQuizStatus({
            isCompleted: true,
            quizStats: { ...state, timeTaken: timer }
        });
    };

    return (
        <View style={styles.quizFieldContainer}>
            <ImageBackground
                source={IdentificationBG}
                style={styles.quizBackgroundWrapper}
                imageStyle={styles.quizBackground}
            >
                <QuizTimer timer={timer} />
                <QuizCard
                    category={state.currentQuestion.category}
                    question={state.currentQuestion.question}
                    questionNum={state.questionNum}
                    questionCount={quizData.details.numOfQuestions}
                />
            </ImageBackground>
            <QuizInput
                answer={state.answer}
                correctAnswer={state.currentQuestion.answer}
                handleAnswer={handleAnswer}
                isLastQuestion={state.questionNum === quizData.details.numOfQuestions - 1}
                dispatch={dispatch}
            />
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    quizFieldContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    quizBackgroundWrapper: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: height * 0.6,
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
