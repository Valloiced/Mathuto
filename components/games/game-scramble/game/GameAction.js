import React, { useId } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

import GameProgressBar from './GameProgressBar';

export default function GameAction({
    scrambledTerm,
    description,
    levelTheme,
    fontSize
}) {
    const id = useId();

    const generateScrambledWord = () => {
        // Attaching Text Tags for every character in every word
        const attachTextTag = (word) => {
            const fontStyle = {
                fontSize: fontSize,
                color: levelTheme
            };

            return word.map((char, i) => (
                <Animated.Text
                    key={id + i + char}
                    style={[styles.scrambledWord, SHADOWS.text, fontStyle]}
                >
                    {char}
                </Animated.Text>
            ));
        };

        return scrambledTerm.map((word, i) => (
            <View key={id + i + word} style={styles.scrambledWord}>
                {attachTextTag(word)}
            </View>
        ));
    };

    const renderScrambledWord = generateScrambledWord();

    return (
        <View style={styles.gameActionContainer}>
            <View style={styles.scrambledWordWrapper}>
                {renderScrambledWord}
            </View>
            <GameProgressBar levelTheme={levelTheme} />
            <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity>
                <Text>Shuffle</Text>
            </TouchableOpacity>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameActionContainer: {
        marginVertical: SIZES.xLarge
    },
    scrambledWordWrapper: {
        height: height * 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: SIZES.xxSmall * -1
    },
    scrambledWord: {
        flexDirection: 'row',
        gap: SIZES.small,
        color: COLORS.textSecondary,
        fontFamily: FONT.MSBlack,
        textTransform: 'uppercase'
    },
    descriptionWrapper: {
        height: height * 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SIZES.medium
    },
    description: {
        color: GameTheme.textColor,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.small,
        textAlign: 'center',
        letterSpacing: 1
    }
});
