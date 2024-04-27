import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useProfile from '../../../../hooks/useProfile';

import GameField from '../../../../components/games/game-scramble/game/GameField';
import GameOverScreen from '../../../../components/games/game-scramble/game/GameOverScreen';

import styles from '../../../../components/games/game-scramble/style/game.style';

export default function MathScrableGame() {
    // Fetch data according to the topics choosen by user (topicId, term, description)
    // Pass it in the game field for setup
    const user = useProfile();

    const [gameStatus, setGameStatus] = useState({
        isCompleted: false,
        isGameOver: false,
        totalPoints: null
    });

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <SafeAreaView style={styles.gameContainer}>
                {!gameStatus.isGameOver ? (
                    <GameField
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                ) : (
                    <GameOverScreen
                        totalPoints={gameStatus.totalPoints}
                        overallPoints={user.totalPoints}
                        isCompleted={gameStatus.isCompleted}
                    />
                )}
            </SafeAreaView>
        </>
    );
}
