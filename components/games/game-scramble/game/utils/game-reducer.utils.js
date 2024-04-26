import {
    shufflePos,
    determineFontSize,
    findLongestWord,
    getLevelTheme,
    scramble
} from '../utils/game.utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SETUP': {
            // Generate position indices for level terms
            const posIndices = new Array(action.data.length)
                .fill(0)
                .map((_, i) => i);
            const shuffleIndices = shufflePos(posIndices);

            /** Terms will be based on rounds */
            const currentTermIndex = shuffleIndices[state.rounds];
            const currentTerm = action.data[currentTermIndex];

            // Scramble the term
            const scrambleTerm = scramble(currentTerm.term);

            // Find the longest word which would work for double worded terms,
            // this would be used to determine the consistent font size of all words
            const longestWord = findLongestWord(scrambleTerm);

            // Measure the width of the longest word temporary for font size
            const wordWidth = longestWord.reduce(
                (acc, char) => acc + char.length,
                0
            );

            const termFontSize = Math.floor(
                determineFontSize(longestWord.length, wordWidth)
            );

            return {
                ...state,
                currentTerm: currentTerm,
                scrambledTerm: scrambleTerm,
                levelTheme: getLevelTheme(state.rounds),
                fontSize: termFontSize,
                gameTermOrder: shuffleIndices
            };
        }
        case 'GENERATE':
            break;
        case 'RESET':
            break;
        case 'SHUFFLE':
            break;
        case 'CORRECT_ANSWER':
            break;
        case 'WRONG_ANSWER':
            break;
        case 'ANSWERING': {
            // Remove spaces if there is
            const answerInput = action.answer.replace(/\s/g, '');
            return {
                ...state,
                answerInput: answerInput
            };
        }
        default:
            return state;
    }
};

export default reducer;
