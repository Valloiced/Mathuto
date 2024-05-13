const initialState = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    questionNum: 0, // Question Tracker
    currentQuestion: {}, // question, answer, category
    answer: '', // Answer input
    answers: [], // Answers inputted by user per question { questionIndex, userAnswer }
    quizOrder: [] // Indices of the retrieve data (randomly shuffled or not)
};

export default initialState;
