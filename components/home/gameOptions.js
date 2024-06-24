import React from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';

import useTheme from '../../hooks/useTheme';

import getStyles from './style/gameOptions.style';

import ArithmeticBlitzDefaultBg from '../../assets/bg/arithmetic-blitz-default-bg.png';
import ArithmeticBlitzRedBg from '../../assets/bg/arithmetic-blitz-red-bg.png';
import MathScrambleDefaultBg from '../../assets/bg/math-scramble-default-bg.png';
import MathScrambleRedBg from '../../assets/bg/math-scramble-red-bg.png';

function GameOptionsCard({ bg, title, handlePress }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <TouchableOpacity onPress={handlePress}>
            <ImageBackground source={bg} style={styles.gameOption} imageStyle={styles.gameOptionBg}>
                <Text style={styles.gameOptionTitle}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default function GameOptions() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    
    return (
        <View style={styles.optionsContainer}>
            <View style={styles.optionsWrapper}>
                <Text style={styles.categoryHeader}>Simple Math Games</Text>

                <View style={styles.gameWrapper}>
                    <GameOptionsCard
                        bg={theme === 'default' ? ArithmeticBlitzDefaultBg : ArithmeticBlitzRedBg}
                        title={'Arithmetic Blitz'}
                        handlePress={() => router.push('/games/arithmetic-blitz/game-lobby')}
                    />
                </View>
            </View>
            <View style={styles.optionsWrapper}>
                <Text style={styles.categoryHeader}>Lesson Math Games</Text>

                <View style={styles.gameWrapper}>
                    <GameOptionsCard
                        bg={theme === 'default' ? MathScrambleDefaultBg : MathScrambleRedBg}
                        title={'Math Scramble'}
                        handlePress={() => router.push('/games/math-scramble/game-lobby')}
                    />
                </View>
            </View>
        </View>
    );
}
