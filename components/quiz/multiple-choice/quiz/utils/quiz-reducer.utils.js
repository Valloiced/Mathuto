import { shuffle } from './quiz.utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SETUP': {
            // Generate position indices for questions
            const posIndices = new Array(action.data.length).fill(0).map((_, i) => i);
            const shuffleIndices = shuffle(posIndices);

            // Question will be based on the questionNum
            const currentQuestionIndex = shuffleIndices[state.questionNum];
            const currentQuestion = action.data[currentQuestionIndex];

            // Merge correct answer and wrong answers then shuffle choices
            const choices = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
            const shuffleChoices = shuffle(choices);

            return {
                ...state,
                currentQuestion: currentQuestion,
                currentChoices: shuffleChoices,
                quizOrder: shuffleIndices
            };
        }
        case 'NEXT_LEVEL': {
            // Question will be based on the questionNum
            const nextQuestionNum = state.questionNum + 1;
            const nextQuestionIndex = state.quizOrder[nextQuestionNum];
            const nextQuestion = action.data[nextQuestionIndex];

            /** If no following questions, do not proceed */
            if (!nextQuestion) {
                return state;
            }

            // Merge correct answer and wrong answers then shuffle choices
            const choices = [nextQuestion.correctAnswer, ...nextQuestion.incorrectAnswers];
            const shuffleChoices = shuffle(choices);

            return {
                ...state,
                questionNum: nextQuestionNum,
                currentQuestion: nextQuestion,
                currentChoices: shuffleChoices
            };
        }
        case 'CORRECT_ANSWER':
            return {
                ...state,
                choosenAnswer: action.answer,
                correctAnswers: state.correctAnswers + 1
            };
        case 'WRONG_ANSWER':
            return {
                ...state,
                choosenAnswer: action.answer,
                incorrectAnswers: state.incorrectAnswers + 1
            };
        case 'RESET':
            const resetFields = {
                correctAnswers: 0,
                incorrectAnswers: 0,
                choosenAnswer: '',
                questionNum: 0,
                currentQuestion: {},
                currentChoices: [],
                quizOrder: []
            };

            return resetFields;
        default:
            return state;
    }
};

export default reducer;
