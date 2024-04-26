import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StatusBar } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import GameField from '../../../../components/games/game-scramble/game/GameField';
import styles from '../../../../components/games/game-scramble/style/game.style';

export default function MathScrableGame() {
    // Fetch data according to the topics choosen by user (topicId, term, description)
    // Pass it in the game field for setup
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
                <GameField />
            </SafeAreaView>
        </>
    );
}
