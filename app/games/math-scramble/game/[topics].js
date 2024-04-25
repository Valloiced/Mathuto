import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameField from '../../../../components/games/game-scramble/game/GameField';

export default function MathScrableGame() {
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
            <SafeAreaView>
                <GameField />
            </SafeAreaView>
        </>
    );
}
