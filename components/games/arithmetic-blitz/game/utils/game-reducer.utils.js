import { evaluate, digitCount } from './game.utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SETUP': {
            const seed = Math.random();
            const generatedNum = Math.floor(seed * 100);

            return {
                ...state,
                maxDigitCount: digitCount(action.diff),
                currentOper: '',
                currentValue: generatedNum,
                trackValue: generatedNum
            };
        }
        case 'GENERATE': {
            const operators = ['+', '-', 'x', '÷'];
            const seed = Math.random();
            let generatedNum;
            let generatedOper = operators[Math.floor(seed * operators.length)];

            // If the operator is multiplication or division, we would like to limit the possible numbers to 20
            if (generatedOper === 'x' || generatedOper === '÷') {
                // Even though the limit is 20, we would like to consider the difficulty conditions
                if (state.maxDigitCount === 1) {
                    generatedNum = Math.floor(seed * 10);
                } else {
                    generatedNum = Math.floor(seed * 20);
                }
            } else {
                /* For addition and subtraction */

                // Generate number based on maximum digit count
                const boundary = Math.pow(10, state.maxDigitCount);
                generatedNum = Math.floor(seed * boundary);
            }

            /** Boundaries and Edge Cases */

            const boundaryOperator = operators[Math.floor(Math.random() * 2)];

            // If the generated number is not divisible to the track value, it may generate
            // decimal values. This condition replaces the current operator with addition and subtraction operators
            if (generatedOper === '÷' && state.trackValue % generatedNum !== 0) {
                generatedOper = boundaryOperator;
            }

            // If the generated operator is multiplication and the track value is already big enough,
            // replace the operator with minor operators such as addition and subtraction
            if (generatedOper === 'x' && state.trackValue.toString().length >= 3) {
                generatedOper = boundaryOperator;
            }

            // Similarly to addition and subtraction, if the track value is already big enough,
            // replace the generated number with a more lenient number.
            if (
                (generatedOper === '+' || generatedOper === '-') &&
                state.trackValue.toString().length >= 3
            ) {
                // Regenerate number but more lenient (only works for medium and hard diff)
                if (state.maxDigitCount > 1) {
                    generatedNum = Math.floor(seed * 50);
                }
            }

            // This would only work upon proceeding for another round
            // The returned object returns only the generated value without the operator as it is the first flip of the proceeding round
            if (state.numOfFlips === 0 && state.round > 1) {
                return {
                    ...state,
                    currentValue: generatedNum,
                    trackValue: generatedNum,
                    flip: state.flip ? 0 : 1,
                    numOfFlips: state.numOfFlips + 1
                };
            }

            return {
                ...state,
                currentOper: generatedOper,
                currentValue: generatedNum,
                trackValue: evaluate(generatedOper, state.trackValue, generatedNum),
                flip: state.flip ? 0 : 1,
                numOfFlips: state.numOfFlips + 1
            };
        }
        case 'ANSWERING': {
            return {
                ...state,
                answer: action.answer
            };
        }
        case 'CORRECT_ANSWER': {
            const multiplier = state.correctAnswers + 1;
            return {
                ...state,
                correctAnswers: state.correctAnswers + 1,
                points: state.points + 100 * multiplier
            };
        }
        case 'WRONG_ANSWER': {
            return {
                ...state,
                remainingLives: state.remainingLives - 1
            };
        }
        case 'RESET_ROUND': {
            return {
                ...state,
                round: state.round + 1,
                numOfFlips: 0,
                trackValue: 0,
                currentOper: '',
                currentValue: 'Ready',
                answer: '',
                flip: state.flip ? 0 : 1
            };
        }
        default:
            return state;
    }
};

export default reducer;
