import { Dimensions } from 'react-native';
import { LevelTheme } from './theme.utils';

import { SIZES } from '../../../../../constants/theme';

const getLevelTheme = (themeIndex = 0) => {
    const themes = Object.values(LevelTheme);
    return themes[themeIndex % themes.length];
};

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

/** Shuffle position indices */
function shufflePos(posArray) {
    for (let i = posArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posArray[i], posArray[j]] = [posArray[j], posArray[i]];
    }
    return posArray;
}

const scramble = (pickedWord) => {
    // Will work for double worded terms
    let shuffledWords = [];
    const words = pickedWord.split(' ');

    // Shuffle every words in a term on their own
    words.forEach((word) => {
        word = word.split('');

        const generateCharPos = new Array(word.length).fill(0).map((_, i) => i);

        // Shuffle the generated position in which the characters in picked word will based.
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
    const scalingFactor = 0.8;

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

const filterPlayableTerms = (lessons) => {
    const maxTermPerRow = 9; // Long words with characters having more than 9 are filtered out
    const playableTerms = lessons.filter((lesson) => {
        const terms = lesson.name.split(' ');

        return terms.every((term) => term.length <= maxTermPerRow);
    });

    return playableTerms.map((term) => ({
        term: term.name,
        description: term.content?.summary
    }));
};

/** Replace existing answers in description with a blank */
const formatCurrentTerm = (currentTerm) => {
    const { term, description } = currentTerm;
    const re = new RegExp(term + '(?:es|s)?', 'gmi');
    const match = description.match(re);
    let newDesc = description;

    if (match) {
        const termLength = term.length;
        newDesc = description.replace(re, '_'.repeat(termLength));
    }

    return {
        term: term,
        description: newDesc
    };
};

module.exports = {
    findLongestWord,
    getLevelTheme,
    shufflePos,
    scramble,
    determineFontSize,
    filterPlayableTerms,
    formatCurrentTerm
};
