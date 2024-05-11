const initialState = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    choosenAnswer: '',
    questionNum: 0, // Question Tracker
    currentQuestion: {}, // question, correct answer, wrong answers
    currentChoices: [], // joined correct answer and wrong answers shuffled
    quizOrder: [] // Indices of the retrieve data randomly shuffled
};

export default initialState;
