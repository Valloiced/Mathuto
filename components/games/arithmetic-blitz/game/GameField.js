import React, { useState, useEffect, useReducer, useRef } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';

import GameHeader from './GameHeader';
import GameCard from './GameCard';
import GameInput from './GameInput';
import GameProgressBar from './GameProgressBar';

import { COLORS, SIZES } from '../../../../constants/theme';

import { initialState, reducer } from './utils';
import { diffInterval, diffTimer } from './utils/game.utils';

export default function GameField({ difficulty, gameOver }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const flipInterval = useRef(null);
    const timerInterval = useRef(null);

    const [showGameInput, setShowGameInput] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answerStatus, setAnswerStatus] = useState({
        isAnswered: false,
        isCorrectAnswer: false
    });

    // Initialization
    useEffect(() => {
        const setup = () => {
            dispatch({ type: 'SETUP', diff: difficulty });
        };
        const startGame = () => {
            dispatch({ type: 'GENERATE' });
        };

        setup();

        // Start loop
        const init = setTimeout(() => {
            flipInterval.current = setInterval(startGame, diffInterval(difficulty));
        }, diffInterval(difficulty));

        return () => {
            clearInterval(flipInterval.current);
            clearTimeout(init);
        };
    }, [difficulty, flipInterval]);

    // Round tracker
    useEffect(() => {
        const roundTotalFlipCount = state.round * 2; // Increases per round

        if (state.numOfFlips === roundTotalFlipCount) {
            clearInterval(flipInterval.current);
            setShowGameInput(true);
            setTimer(diffTimer(difficulty));
        }
    }, [difficulty, flipInterval, state.numOfFlips, state.round]);

    // Timer tracker
    useEffect(() => {
        if (showGameInput) {
            timerInterval.current = setInterval(() => setTimer((prev) => prev - 1), 1500);
        }

        if (!timer && showGameInput) {
            clearInterval(timerInterval.current);
            dispatch({ type: 'WRONG_ANSWER' });
            setAnswerStatus({
                isAnswered: true,
                isCorrectAnswer: false
            });
        }

        return () => clearInterval(timerInterval.current);
    }, [timer, timerInterval, showGameInput]);

    // Game Over Handler
    useEffect(() => {
        if (!state.remainingLives) {
            gameOver({
                isGameOver: true,
                finalPoints: state.points
            });
        }
    }, [state.remainingLives, state.points, gameOver]);

    // Round Proceeder
    const continueGame = () => {
        // Reset everything
        const startGame = () => {
            dispatch({ type: 'GENERATE' });
        };

        setShowGameInput(false);
        setAnswerStatus({
            isAnswered: false,
            isCorrectAnswer: false
        });
        dispatch({ type: 'RESET_ROUND' });
        flipInterval.current = setInterval(startGame, diffInterval(difficulty));
    };

    const handleSubmit = () => {
        if (state.answer === '') {
            return; // do not proceed for no input
        }

        let isCorrect;
        let answer = Number(state.answer);
        let correctAnswer = state.trackValue;

        clearInterval(timerInterval.current); // Stop the timer first

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
        <View style={styles.gameFieldContainer}>
            <GameHeader
                remainingLives={state.remainingLives}
                points={state.points}
                difficulty={difficulty}
            />
            <GameCard
                flip={state.flip}
                currentValue={state.currentValue}
                currentOper={state.currentOper}
                timer={timer}
                showTimer={showGameInput} // Show timer with the game input
            />
            <GameProgressBar
                reset={state.flip} // timer reset on flip change
                showProgressBar={!showGameInput}
                duration={diffInterval(difficulty)}
            />
            {showGameInput && (
                <GameInput
                    answer={state.answer}
                    answerStatus={answerStatus}
                    setAnswerStatus={setAnswerStatus}
                    handleSubmit={handleSubmit}
                    continueGame={continueGame}
                    dispatch={dispatch}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    gameFieldContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.medium
    },
    btn: {
        width: '100%',
        backgroundColor: 'white'
    },
    flipInterval: {
        marginTop: SIZES.medium,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: SIZES.xxSmall * 0.5
    }
});
