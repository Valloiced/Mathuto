import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useProfile from '../../../../hooks/useProfile';

import { filterPlayableTerms } from '../../../../components/games/game-scramble/game/utils/game.utils';

import GameField from '../../../../components/games/game-scramble/game/GameField';
import GameOverScreen from '../../../../components/games/game-scramble/game/GameOverScreen';

import styles from '../../../../components/games/game-scramble/style/game.style';

export default function MathScrableGame() {
    const user = useProfile();
    const params = useGlobalSearchParams();

    const [gameData, setGameData] = useState([]);
    const [gameStatus, setGameStatus] = useState({
        isCompleted: false,
        isGameOver: true,
        totalPoints: 1200
    });

    useEffect(() => {
        /** Fetch lesson data to be used for the game */
        const fetchGameData = async () => {
            try {
                // Extract topic ids from the params
                const topicIds = params.topics.split(',');

                // Use this to get data
                const fetchLessons = topicIds.map(async (topicId) => {
                    const lessonRes = await axios.get(
                        `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topicId}`
                    );

                    const lessons = lessonRes.data.lessons;
                    return filterPlayableTerms(lessons);
                });

                const lessonsData = await Promise.all(fetchLessons);
                setGameData(lessonsData.flat());
            } catch (error) {
                console.error(error);
            }
        };

        if (params) {
            fetchGameData();
        }
    }, [params]);

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
                {!gameData.length ? (
                    <Text>Loading</Text>
                ) : !gameStatus.isGameOver ? (
                    <GameField
                        gameData={gameData}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                ) : (
                    <GameOverScreen
                        gameQuery={params.topics}
                        totalPoints={gameStatus.totalPoints}
                        overallPoints={user.totalPoints}
                        isCompleted={gameStatus.isCompleted}
                    />
                )}
            </SafeAreaView>
        </>
    );
}
