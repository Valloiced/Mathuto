import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useProfile from '../../../../hooks/useProfile';
import useCache from '../../../../hooks/useCache';
import useNetStatus from '../../../../hooks/useNetStatus';

import { filterPlayableTerms } from '../../../../components/games/game-scramble/game/utils/game.utils';

import GameField from '../../../../components/games/game-scramble/game/GameField';
import GameOverScreen from '../../../../components/games/game-scramble/game/GameOverScreen';

import styles from '../../../../components/games/game-scramble/style/game.style';
import GameLoading from '../../../../components/games/game-scramble/game/Loading';

export default function MathScrableGame() {
    const user = useProfile();
    const params = useGlobalSearchParams();
    const { isConnected } = useNetStatus();
    const { data, loadingCache } = useCache('topics', []);

    const [loading, setLoading] = useState(true);
    const [animationLoaded, setAnimationLoaded] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const [gameData, setGameData] = useState([]);
    const [gameStatus, setGameStatus] = useState({
        isCompleted: false,
        isGameOver: false,
        totalPoints: null
    });

    const fetchDataFromCache = useCallback(() => {
        // Extract topic ids from the params
        const topicIds = params.topics.split(',');

        const findTopics = data.filter(
            (topic) => topicIds.indexOf(topic.details?.id) !== -1
        );

        const extractedLessons = findTopics.map((topics) =>
            filterPlayableTerms(topics.lessons)
        );

        if (findTopics) {
            return extractedLessons;
        } else {
            return [];
        }
    }, [data, params]);

    useEffect(() => {
        /** Fetch lesson data to be used for the game */
        const fetchGameData = async () => {
            try {
                setIsFetching(true);

                // Extract topic ids from the params
                const topicIds = params.topics.split(',');

                // Use this to get data
                const fetchLessons = await topicIds.map(async (topicId) => {
                    const lessonRes = await axios.get(
                        `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topicId}`
                    );

                    const lessons = lessonRes.data.lessons;
                    return filterPlayableTerms(lessons);
                });

                const lessonsData = await Promise.all(fetchLessons);

                setGameData(lessonsData.flat());
                setLoading(false);
                setIsFetching(false);
            } catch (error) {
                console.error(error);
                /** Add a logic here so that the game automatically redirect to home when error is encountered */
            }
        };

        if (params && loading) {
            if (isConnected && !isFetching) {
                fetchGameData();
            }

            if (isConnected === false && loading && !loadingCache) {
                const lessonsData = fetchDataFromCache();

                setGameData(lessonsData.flat());
                setLoading(false);
            }
        }
    }, [
        params,
        loading,
        isConnected,
        isFetching,
        loadingCache,
        fetchDataFromCache
    ]);

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <SafeAreaView
                style={styles.gameContainer(loading || !animationLoaded)}
            >
                {(loading || !animationLoaded) && (
                    <GameLoading
                        animationLoaded={animationLoaded}
                        setAnimationLoaded={setAnimationLoaded}
                    />
                )}
                {!loading && animationLoaded && !gameStatus.isGameOver && (
                    <GameField
                        gameData={gameData}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                )}
                {!loading && animationLoaded && gameStatus.isGameOver && (
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
