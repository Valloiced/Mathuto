import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, router } from 'expo-router';
import { StatusBar, ScrollView, View, Text } from 'react-native';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import SelectionContainer from '../../../components/games/game-scramble/SelectionContainer';
import StartButton from '../../../components/games/game-scramble/StartButton';

import { COLORS, SIZES } from '../../../constants/theme';
import styles from '../../../components/games/game-scramble/style/game-lobby.style';

function SelectionLabel({ selectedCount }) {
    return (
        <View style={styles.selectionLabelWrapper}>
            <Text style={styles.topicsSelectedCount}>{selectedCount}</Text>
            <Text style={styles.topicsSelected}>SELECTED</Text>
        </View>
    );
}

export default function GameLobby() {
    const [materials, setMaterials] = useState([]);
    const [choosenTopics, setChoosenTopics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                /** Fetch materials details */
                const materialsRes = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/materials`
                );
                const topics = materialsRes.data?.topics;

                if (topics) {
                    /** Fetch lesson data for the topics fetched */
                    const fetchLessons = topics.map(async (topic) => {
                        const lessonRes = await axios.get(
                            `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topic.id}?exclude_fields=content,createdOn`
                        );

                        return lessonRes.data;
                    });

                    const materialsData = await Promise.all(fetchLessons);
                    setMaterials(materialsData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (!materials.length) {
            fetchData();
        }
    }, [materials]);

    const handleStart = () => {
        if (choosenTopics.length) {
            const topicsQuery = choosenTopics.join(',');
            router.replace(`/games/math-scramble/game/${topicsQuery}`);
        }
    };

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Stack.Screen
                options={{
                    headerShadowVisible: true,
                    headerShown: true,
                    headerBackVisible: false,
                    headerLeft: ReturnHeaderBtn,
                    headerTitle: () => (
                        <View style={{ marginLeft: SIZES.medium }}>
                            <Text style={styles.headerTitle}>
                                CHOOSE TOPICS
                            </Text>
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: COLORS.white
                    },
                    headerRight: () => (
                        <SelectionLabel selectedCount={choosenTopics.length} />
                    ),
                    headerTitleAlign: 'left'
                }}
            />
            <ScrollView style={styles.gameLobbyContainer}>
                <SelectionContainer
                    materials={materials}
                    choosenTopics={choosenTopics}
                    setChoosenTopics={setChoosenTopics}
                />
            </ScrollView>
            <StartButton handleStart={handleStart} />
        </>
    );
}
