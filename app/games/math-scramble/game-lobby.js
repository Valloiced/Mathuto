import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, router } from 'expo-router';
import { StatusBar, ScrollView, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import useTheme from '../../../hooks/useTheme';
import useCache from '../../../hooks/useCache';
import useNetStatus from '../../../hooks/useNetStatus';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import SelectionContainer from '../../../components/games/game-scramble/SelectionContainer';
import StartButton from '../../../components/games/game-scramble/StartButton';
import OfflineCard from '../../../components/games/game-scramble/OfflineCard';
import OfflineView from '../../../components/games/game-scramble/OfflineView';

import { COLORS, SIZES } from '../../../constants/theme';
import getStyles from '../../../components/games/game-scramble/style/game-lobby.style';


function SelectionLabel({ selectedCount }) {
    const [theme, changeTheme] = useTheme();

const styles = getStyles(theme);

    return (
        <View style={styles.selectionLabelWrapper}>
            <Text style={styles.topicsSelectedCount}>{selectedCount}</Text>
            <Text style={styles.topicsSelected}>SELECTED</Text>
        </View>
    );
}

export default function GameLobby() {
    const { data, loadingCache } = useCache('topics', []);
    const { isConnected } = useNetStatus();
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const [materials, setMaterials] = useState([]);
    const [choosenTopics, setChoosenTopics] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    // on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);

                /** Fetch materials details */
                const materialsRes = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/materials`
                );
                const topics = materialsRes.data?.topics;

                if (topics) {
                    setMaterials(topics);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        };

        if (!materials.length && loading) {
            if (isConnected && !isFetching) {
                fetchData();
            }

            if (isConnected === false && !loadingCache) {
                const filterTopics = data.map((topic) => topic.details);

                setMaterials(filterTopics);
                setLoading(false);
            }
        }
    }, [materials, isConnected, isFetching, data, loading, loadingCache]);

    const handleStart = () => {
        if (choosenTopics.length) {
            const topicsQuery = choosenTopics.join(',');
            router.replace(`/games/math-scramble/game/${topicsQuery}`);
        }
    };
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <Stack.Screen
                options={{
                    headerShadowVisible: true,
                    headerShown: true,
                    headerBackVisible: false,
                    headerLeft: ReturnHeaderBtn,
                    headerTitle: () => (
                        <View style={{ marginLeft: SIZES.medium }}>
                            <Text style={styles.headerTitle}>CHOOSE TOPICS</Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: COLORS.white
                    },
                    headerRight: () => <SelectionLabel selectedCount={choosenTopics.length} />,
                    headerTitleAlign: 'left'
                }}
            />
            <ScrollView style={styles.gameLobbyContainer}>
                {!isConnected && <OfflineCard />}
                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionIndicator}>
                        ⓘ You can only choose five topics.
                    </Text>
                    {!isConnected && !loading && !materials.length ? (
                        <OfflineView />
                    ) : (
                        <SelectionContainer
                            loading={loading}
                            materials={materials}
                            choosenTopics={choosenTopics}
                            setChoosenTopics={setChoosenTopics}
                        />
                    )}
                </View>
            </ScrollView>
            <StartButton handleStart={handleStart} />
        </>
    );
}
