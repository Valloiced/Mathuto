import React from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';

import styles from './style/gameOptions.style';

import ArithmeticBlitzBG from '../../assets/bg/arithmetic-blitz-bg.png';
import MathScrambleBG from '../../assets/bg/math-scramble-bg.png';

function GameOptionsCard({ bg, title, handlePress }) {
    return (
        <TouchableOpacity onPress={handlePress}>
            <ImageBackground source={bg} style={styles.gameOption} imageStyle={styles.gameOptionBg}>
                <Text style={styles.gameOptionTitle}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default function GameOptions() {
    return (
        <View style={styles.optionsContainer}>
            <View style={styles.optionsWrapper}>
                <Text style={styles.categoryHeader}>Simple Math Games</Text>

                <View style={styles.gameWrapper}>
                    <GameOptionsCard
                        bg={ArithmeticBlitzBG}
                        title={'Arithmetic Blitz'}
                        handlePress={() => router.push('/games/arithmetic-blitz/game-lobby')}
                    />
                </View>
            </View>
            <View style={styles.optionsWrapper}>
                <Text style={styles.categoryHeader}>Lesson Math Games</Text>

                <View style={styles.gameWrapper}>
                    <GameOptionsCard
                        bg={MathScrambleBG}
                        title={'Math Scramble'}
                        handlePress={() => router.push('/games/math-scramble/game-lobby')}
                    />
                </View>
            </View>
        </View>
    );
}
