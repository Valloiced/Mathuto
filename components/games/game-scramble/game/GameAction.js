import React, { useId } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { FONT, SHADOWS, SIZES } from '../../../../constants/theme';

const sampleWords = [
    // 'Discrete', // 7 char
    // 'Alibi', // 5 char
    'Test for thing', // 4char
    // 'Automation', // 10 char,
    'Pythagorean Theorem' // 6 char
];

const findLongestWord = (wordList) => {
    let max = -Infinity;
    let maxIdx;

    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].length > max) {
            max = wordList[i].length;
            maxIdx = i;
        }
    }

    return wordList[maxIdx];
};

const scramble = (pickedWord) => {
    // Shuffle the generated position in which the characters in picked word will based.
    function shufflePos(posArray) {
        for (let i = posArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posArray[i], posArray[j]] = [posArray[j], posArray[i]];
        }
        return posArray;
    }

    // Will work for double worded terms
    let shuffledWords = [];
    const words = pickedWord.split(' ');

    // Shuffle every words in a term on their own
    words.forEach((word) => {
        word = word.split('');

        const generateCharPos = new Array(word.length).fill(0).map((_, i) => i);
        const shuffledCharPos = shufflePos(generateCharPos);

        const shuffledWord = shuffledCharPos.map((charPos) => word[charPos]);
        shuffledWords.push(shuffledWord);
    });

    return shuffledWords;
};

const determineFontSize = (charCount, wordWidth) => {
    const { width } = Dimensions.get('window');

    const screenPadding = SIZES.medium * 2;
    const charGap = SIZES.small; // Gap between characters in a word

    const totalCharWidth = wordWidth * charCount;
    const availableWidth = width - screenPadding - charGap * (charCount - 1);

    // Adjust scaling factor to ensure readability
    const scalingFactor = 0.9;

    let fontSize =
        (availableWidth / totalCharWidth) * wordWidth * scalingFactor;

    // Set a minimum and maximum font size, not so big, not so small
    const maxFontSize = 64;
    const minFontSize = 24;
    if (fontSize < minFontSize) {
        fontSize = minFontSize;
    } else if (fontSize > maxFontSize) {
        fontSize = maxFontSize;
    }

    return fontSize;
};

export default function GameAction() {
    const id = useId();

    const generateScrambledWord = () => {
        /** Helper Functions */

        // Generate Shuffled words first which returns a two dimensional array for double worded terms
        const generate = () => {
            const listLength = sampleWords.length;
            const randIndex = Math.floor(Math.random() * listLength);

            const pickWord = sampleWords[randIndex];
            return scramble(pickWord);
        };

        // Attaching Text Tags for every character in every word
        const attachTextTag = (word) => {
            return word.map((char, i) => (
                <Text
                    key={id + i + char}
                    style={[charStyle, styles.scrambledWord, SHADOWS.text]}
                >
                    {char}
                </Text>
            ));
        };

        /** Entry */
        // Generate shuffled words first
        const newScrambledWords = generate();

        // Find the longest word which would work for double worded terms,
        // this would be used to determine the consistent font size of all words
        const longestWord = findLongestWord(newScrambledWords);

        // Measure the width of the longest word temporary for font size
        const wordWidth = longestWord.reduce(
            (acc, char) => acc + char.length,
            0
        );

        const charStyle = {
            fontSize: Math.floor(
                determineFontSize(longestWord.length, wordWidth)
            )
        };

        return newScrambledWords.map((word, i) => (
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
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameActionContainer: {
        marginVertical: SIZES.xLarge
    },
    scrambledWordWrapper: {
        backgroundColor: 'yellow',
        height: height * 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: SIZES.xxSmall * -1
    },
    scrambledWord: {
        flexDirection: 'row',
        gap: SIZES.small,
        color: '#895B1E',
        fontFamily: FONT.MSBlack,
        textTransform: 'uppercase'
    }
});
