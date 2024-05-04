import React, { useId, useRef, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Pressable,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';

import { Shuffle } from '../../../../assets/icons';
import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SIZES
} from '../../../../constants/theme';

import { findLongestWord } from './utils/game.utils';

import { GameTheme } from './utils/theme.utils';

export default function GameInput({
    scrambledTerm,
    levelTheme,
    fontSize,
    answerInput,
    handleSubmit,
    answerStatus,
    dispatch
}) {
    const id = useId();
    const termLength = scrambledTerm.reduce(
        (acc, word) => (acc += word.length),
        0
    );

    // Create empty two dimensional array that resembles the scrambled term
    const answerArray = Array.from({ length: scrambledTerm.length }, (_, i) => {
        return new Array(scrambledTerm[i].length).fill('');
    });

    const textInputRef = useRef(null);

    const toTextBoxes = useCallback(() => {
        const attachTextBox = (char, i, j) => {
            const emptyChar = ' ';
            const textBoxChar = answerInput[i + j] || emptyChar;

            const enteringAnimation = BounceIn.delay(50 * j);

            return (
                <Animated.Text
                    key={id + j + char}
                    style={[styles.textBox, textStyle]}
                    entering={enteringAnimation}
                >
                    {textBoxChar}
                </Animated.Text>
            );
        };

        const getTextBoxDimensions = () => {
            const { width } = Dimensions.get('window');

            const wordLength = scrambledTerm[0].length;
            const charFontSize = fontSize / 1.5; // Smaller
            const screenPadding = SIZES.small * 2;
            const wordSize = wordLength * charFontSize;

            let remainingSpaces = width - wordSize - screenPadding;

            // For correction in the gapping
            let scalingFactor = 0.8;
            if (wordLength > 7) {
                scalingFactor = 0.5;
            }

            const textBoxHeight = charFontSize * 2;
            const textBoxWidth =
                (remainingSpaces * 0.9) / wordLength + charFontSize; // Get 90 of remaining spaces for width

            // Use the remaining spaces for gaps
            remainingSpaces = remainingSpaces - textBoxWidth * wordLength;

            let textBoxGap = remainingSpaces / wordLength;
            textBoxGap = textBoxGap - textBoxGap * scalingFactor; // Remove extra gap to the right

            return [textBoxHeight, textBoxWidth, textBoxGap];
        };

        /** Determine text box layout */
        const longestWord = findLongestWord(scrambledTerm);
        const [textBoxHeight, textBoxWidth, textBoxGap] =
            getTextBoxDimensions(longestWord);

        const textStyle = {
            fontSize: fontSize / 1.5,
            width: textBoxWidth,
            height: textBoxHeight,
            marginRight: textBoxGap,
            color: answerStatus.isAnswered
                ? answerStatus.isCorrectAnswer
                    ? GameTheme.correctTextColor
                    : GameTheme.wrongTextColor
                : GameTheme.textColor,
            backgroundColor: answerStatus.isAnswered
                ? answerStatus.isCorrectAnswer
                    ? GameTheme.correctBgColor
                    : GameTheme.wrongBgColor
                : COLORS.white,
            borderColor: answerStatus.isAnswered
                ? answerStatus.isCorrectAnswer
                    ? GameTheme.correctTextColor
                    : GameTheme.wrongTextColor
                : COLORS.textSecondary + '40'
        };

        /** Render text boxes */

        return answerArray.map((word, i) => {
            // Use the for double worded terms, used the previous word length to index the next word depending in the answer state
            const prevWordLength = answerArray[i - 1]?.length - 1 || 0;

            return (
                <View key={id + i + word} style={styles.textBoxWrapper}>
                    {word.map((char, j) =>
                        attachTextBox(char, prevWordLength + i, j)
                    )}
                </View>
            );
        });
    }, [answerArray, answerInput, answerStatus, fontSize, id, scrambledTerm]);

    useEffect(() => {
        if (answerStatus.isAnswered) {
            toTextBoxes();
        }
    }, [answerStatus, toTextBoxes]);

    const handleOnPress = () => {
        textInputRef?.current?.focus();
    };

    const renderInput = toTextBoxes();

    return (
        <View style={styles.gameInputContainer}>
            <View style={styles.shuffleWrapper}>
                <TouchableOpacity
                    onPress={() => dispatch({ type: 'SHUFFLE' })}
                    disabled={answerStatus.isAnswered}
                >
                    <Shuffle style={styles.shuffleIcon(levelTheme)} />
                </TouchableOpacity>
            </View>
            <View>
                <Pressable onPress={handleOnPress}>{renderInput}</Pressable>
                <TextInput
                    style={styles.hiddenInput}
                    value={answerInput}
                    onChangeText={(text) =>
                        dispatch({ type: 'ANSWERING', answer: text })
                    }
                    maxLength={termLength}
                />
            </View>
            <TouchableOpacity
                style={styles.gameInputBtn(answerStatus.isAnswered)}
                onPress={handleSubmit}
                disabled={answerStatus.isAnswered}
            >
                <Text style={styles.gameInputBtnText}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameInputContainer: {
        flexDirection: 'column',
        height: height * 0.4
    },
    shuffleWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: SIZES.xLarge,
        borderRadius: BORDER_RADIUS.xxLarge
    },
    shuffleIcon: (levelTheme) => ({
        fontSize: SIZES.xLarge,
        color: levelTheme || GameTheme.secondaryBgColor
    }),
    textBoxWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xxSmall,
        marginVertical: SIZES.xxSmall
    },
    textBox: {
        flexDirection: 'row',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: FONT.MSBlack,
        textTransform: 'uppercase',
        color: GameTheme.textColor,
        borderWidth: 2,
        borderRadius: BORDER_RADIUS.small
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        top: 0,
        bottom: height * -1, // Out of screen
        left: 0,
        right: 0
    },
    gameInputBtn: (isDisabled) => ({
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        bottom: SIZES.large,
        alignSelf: 'center',
        width: '70%',
        backgroundColor: isDisabled
            ? GameTheme.textColor + 'BF'
            : GameTheme.secondaryBgColor,
        borderRadius: BORDER_RADIUS.small
    }),
    gameInputBtnText: {
        color: COLORS.white,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    }
});
