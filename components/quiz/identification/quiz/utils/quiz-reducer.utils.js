import { shuffle } from './quiz.utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'SETUP': {
            // Generate position indices for questions
            const posIndices = new Array(action.data.length).fill(0).map((_, i) => i);
            // const shuffleIndices = shuffle(posIndices);
            const shuffleIndices = posIndices;

            // Question will be based on the questionNum
            const currentQuestionIndex = shuffleIndices[state.questionNum];
            const currentQuestion = action.data[currentQuestionIndex];

            return {
                ...state,
                currentQuestion: currentQuestion,
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

            return {
                ...state,
                answer: '',
                questionNum: nextQuestionNum,
                currentQuestion: nextQuestion
            };
        }
        case 'CORRECT_ANSWER': {
            const updateAnswers = state.answers;
            const quizIndex = state.quizOrder[state.questionNum];

            const newAnswer = {
                quizIndex: quizIndex,
                isCorrect: true,
                userAnswer: state.answer
            }

            updateAnswers.push(newAnswer);

            return {
                ...state,
                answers: updateAnswers,
                correctAnswers: state.correctAnswers + 1
            };
        }
        case 'WRONG_ANSWER': {
            const updateAnswers = state.answers;
            const quizIndex = state.quizOrder[state.questionNum];

            const newAnswer = {
                quizIndex: quizIndex,
                isCorrect: false,
                userAnswer: state.answer
            }

            updateAnswers.push(newAnswer);

            return {
                ...state,
                answers: updateAnswers,
                incorrectAnswers: state.incorrectAnswers + 1
            };
        }
        case 'ANSWERING': 
            return {
                ...state,
                answer: action.answer
            }
        default:
            return state;
    }
};

export default reducer;
