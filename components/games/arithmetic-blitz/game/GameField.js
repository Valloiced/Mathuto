import React, { useState, useEffect, useReducer, useRef } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';

import useSound from '../../../../hooks/useSound';

import GameHeader from './GameHeader';
import GameCard from './GameCard';
import GameInput from './GameInput';
import GameProgressBar from './GameProgressBar';

import { COLORS, SIZES } from '../../../../constants/theme';

import { initialState, reducer } from './utils';
import { diffInterval, diffTimer } from './utils/game.utils';

export default function GameField({ difficulty, gameOver, modalVisible, setModalVisible }) {
    const { sounds, playSound } = useSound();

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
            dispatch({ type: 'RESET' });
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
        // Increases per round
        // Maximum of 10 flips
        const roundTotalFlipCount = Math.min(state.round + 1, 10);

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
            playSound(sounds.lose);

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

        flipInterval.current = setInterval(startGame, flipRoundInterval());
        playSound(sounds.powerUp);
    };

    const flipRoundInterval = () => {
        // Following rounds goes faster as the player progress
        // Timer Boundary is only about 2 seconds.
        const diffFlipMultiplier = 2 / diffInterval(difficulty) / 1000;
        return Math.max(
            2000,
            diffInterval(difficulty) - Math.floor(state.round * diffFlipMultiplier * 1000)
        );
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

            playSound(sounds.achievementLow);
        } else {
            dispatch({ type: 'WRONG_ANSWER' });
            isCorrect = false;

            playSound(sounds.lose);
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
                setModalVisible={setModalVisible}
            />
            <GameCard
                flip={state.flip}
                currentValue={state.currentValue}
                currentOper={state.currentOper}
                round={state.round}
                timer={timer}
                showTimer={showGameInput} // Show timer with the game input
            />
            <GameProgressBar
                reset={state.flip} // timer reset on flip change
                showProgressBar={!showGameInput}
                duration={flipRoundInterval()}
                modalVisible={modalVisible}
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
