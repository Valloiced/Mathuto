import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useMusic from '../../../../hooks/useMusic';
import useProfile from '../../../../hooks/useProfile';

import Loading from '../../../../components/games/arithmetic-blitz/game/Loading';
import GameField from '../../../../components/games/arithmetic-blitz/game/GameField';
import GameOverScreen from '../../../../components/games/arithmetic-blitz/game/GameOverScreen';

import { diffMultiplier } from '../../../../components/games/arithmetic-blitz/game/utils/game.utils';

import { COLORS } from '../../../../constants/theme';

export default function ArithmeticBlitzGame() {
    const { music, loadMusicList, playMusicList, unloadMusic } = useMusic();
    const params = useLocalSearchParams();
    const user = useProfile();

    const [loading, setLoading] = useState(true);
    const [gameStatus, setGameStatus] = useState({
        isGameOver: false,
        totalPoints: null,
        finalPoints: 0
    });

    useEffect(() => {
        const loadMusic = async () => {
            switch (params.difficulty) {
                case 'easy':
                    loadMusicList(music.easy, music.easyAlt);
                    break;
                case 'medium':
                    loadMusicList(music.medium, music.mediumAlt);
                    break;
                case 'hard':
                    loadMusicList(music.hardAlt, music.hard);
                    break;
            }

            playMusicList();
        };

        if (params.difficulty && !loading) {
            loadMusic();
        }
    }, [params.difficulty, loading]);

    useEffect(() => {
        if (gameStatus.isGameOver && gameStatus.totalPoints == null) {
            unloadMusic();

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
