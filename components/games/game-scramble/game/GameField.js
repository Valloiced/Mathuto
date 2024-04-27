import React, { useState, useReducer, useEffect, useRef } from 'react';
import { View, Vibration } from 'react-native';

import { initialState, reducer } from './utils';

import GameAction from './GameAction';
import GameHeader from './GameHeader';

import sampleData from './test/sampleData';
import GameInput from './GameInput';

export default function GameField({ gameStatus, setGameStatus }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const levelDuration = 10; // Duration per level (ms)
    const timerInterval = useRef(null);
    const [timer, setTimer] = useState(0);

    const [isCancelled, setIsCancelled] = useState(false);
    const [answerStatus, setAnswerStatus] = useState({
        isAnswered: false,
        isCorrectAnswer: false
    });

    /** Setup */
    useEffect(() => {
        dispatch({ type: 'SETUP', data: sampleData });

        setTimer(levelDuration);
    }, []);

    /** Timer Tracker */
    useEffect(() => {
        if (timer > 0 && !gameStatus.isGameOver) {
            timerInterval.current = setInterval(
                () => setTimer((prev) => prev - 1),
                1000
            );
        }

        if (timer <= 0 && timerInterval.current) {
            clearInterval(timerInterval.current);
            timerInterval.current = null;
            dispatch({ type: 'WRONG_ANSWER' });
            setAnswerStatus({
                isAnswered: true,
                isCorrectAnswer: false
            });
        }

        return () => clearInterval(timerInterval.current);
    }, [timer, gameStatus.isGameOver]);

    /** End of Level Tracker */
    useEffect(() => {
        let nextLevelTimeout;

        if (answerStatus.isAnswered && !gameStatus.isGameOver) {
            nextLevelTimeout = setTimeout(() => {
                setTimer(levelDuration);
                setAnswerStatus({
                    isAnswered: false,
                    isCorrectAnswer: false
                });
                setIsCancelled(false);
                dispatch({ type: 'NEXT_LEVEL', data: sampleData });
            }, 5000);
        }

        return () => nextLevelTimeout && clearTimeout(nextLevelTimeout);
    }, [answerStatus, setAnswerStatus, gameStatus.isGameOver]);

    /** End of Game Tracker */
    useEffect(() => {
        // Stop game if all terms are answered
        if (
            state.rounds >= sampleData.length - 1 &&
            answerStatus.isAnswered &&
            !gameStatus.isGameOver
        ) {
            clearInterval(timerInterval);
            setGameStatus({
                isCompleted: true,
                isGameOver: true,
                totalPoints: state.points
            });
            // .... Complete Game Modal
        }

        // Stop game if there are no remaining lives
        if (!state.remainingLives && !gameStatus.isGameOver) {
            clearInterval(timerInterval);
            setGameStatus({
                isGameOver: true,
                totalPoints: state.points
            });
            // ....
        }
    }, [
        state.rounds,
        state.remainingLives,
        state.points,
        gameStatus,
        setGameStatus,
        answerStatus
    ]);

    const handleSubmit = () => {
        let isCorrect;
        let answer = state.answerInput.toLowerCase();
        let correctAnswer = state.currentTerm.term
            .toLowerCase()
            .replace(/\s/g, ''); // Remove spaces too

        if (
            state.answerInput === '' ||
            correctAnswer.length !== answer.length
        ) {
            return; // do not proceed for no input
        }

        clearTimeout(timerInterval.current); // Stop the timer first
        timerInterval.current = null;
        setIsCancelled(true); // Stop progress bar

        if (answer === correctAnswer) {
            dispatch({ type: 'CORRECT_ANSWER' });
            isCorrect = true;
        } else {
            dispatch({ type: 'WRONG_ANSWER' });
            isCorrect = false;
            Vibration.vibrate(300);
        }

        setAnswerStatus({
            isAnswered: true,
            isCorrectAnswer: isCorrect
        });
    };

    return (
        <View>
            <GameHeader
                points={state.points}
                remainingLives={state.remainingLives}
            />
            <GameAction
                scrambledTerm={state.scrambledTerm}
                description={state.currentTerm.description}
                levelTheme={state.levelTheme}
                fontSize={state.fontSize}
                shuffle={state.shuffle}
                reset={state.reset}
                levelDuration={levelDuration}
                isCancelled={isCancelled}
            />
            <GameInput
                levelTheme={state.levelTheme}
                scrambledTerm={state.scrambledTerm}
                fontSize={state.fontSize}
                answerInput={state.answerInput}
                answerStatus={answerStatus}
                handleSubmit={handleSubmit}
                dispatch={dispatch}
            />
        </View>
    );
}
