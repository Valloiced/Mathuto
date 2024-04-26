const initialState = {
    points: 0,
    remainingLives: 3,
    answerInput: '', // User Input
    currentTerm: {}, // term, description
    scrambledTerm: [[]],
    fontSize: 24, // Minimum = 24
    rounds: 0,
    levelTheme: '', // Color theme
    gameTermOrder: [] // Indices of the retrieve data randomly shuffled
};

export default initialState;
