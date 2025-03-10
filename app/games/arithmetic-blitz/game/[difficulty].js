import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loading from '../../../../components/games/arithmetic-blitz/game/Loading';
import GameField from '../../../../components/games/arithmetic-blitz/game/GameField';
import GameOverScreen from '../../../../components/games/arithmetic-blitz/game/GameOverScreen';

import { diffMultiplier } from '../../../../components/games/arithmetic-blitz/game/utils/game.utils';

import { COLORS } from '../../../../constants/theme';
import useProfile from '../../../../hooks/useProfile';

export default function ArithmeticBlitzGame() {
    const params = useLocalSearchParams();
    const user = useProfile();

    const [loading, setLoading] = useState(true);
    const [gameStatus, setGameStatus] = useState({
        isGameOver: false,
        totalPoints: null,
        finalPoints: 0
    });

    useEffect(() => {
        if (gameStatus.isGameOver && gameStatus.totalPoints == null) {
            const totalPoints = gameStatus.finalPoints * diffMultiplier(params.difficulty);

            setGameStatus({
                ...gameStatus,
                totalPoints: totalPoints
            });
        }
    }, [gameStatus, user.totalPoints, params.difficulty]);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />

            <SafeAreaView style={styles.gameContainer}>
                {loading ? (
                    <Loading setLoading={setLoading} />
                ) : !gameStatus.isGameOver ? (
                    <GameField difficulty={params.difficulty} gameOver={setGameStatus} />
                ) : (
                    <GameOverScreen
                        scoreDetails={{
                            ...gameStatus,
                            overallPoints: user.totalPoints,
                            difficulty: params.difficulty,
                            multiplier: diffMultiplier(params.difficulty),
                            earnedPoints: gameStatus.finalPoints
                        }}
                    />
                )}
            </SafeAreaView>
        </>
    );
}

// Constants and styling are ignored in the game section. Constant names may not be semantically adhere to its purpose.
const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        backgroundColor: COLORS.textPrimary
    }
});
