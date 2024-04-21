/** I could just use eval(), however, it's too dangerous that I might have to avoid it */
export const evaluate = (operator, value1, value2) => {
    value1 = Number(value1);
    value2 = Number(value2);

    switch (operator) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case 'x':
            return value1 * value2;
        case '÷':
            // Division by 0 would be handle by the upon generation
            return value1 / value2;
        default:
            // Just in case
            return;
    }
};

/** Serves as interval before the next card flip. The interval depends on difficulty */
export const diffInterval = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 3000;
        case 'medium':
            return 4000;
        case 'hard':
            return 6000;
        default:
            return 3000;
    }
};

/** Serves as a point multiplier based on difficulty */
export const diffMultiplier = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 1.0;
        case 'medium':
            return 1.5;
        case 'hard':
            return 2.5;
        default:
            return 1.0;
    }
};

/** Used in answering state. The timer before it runs out is based on difficulty */
export const diffTimer = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 5;
        case 'medium':
            return 7;
        case 'hard':
            return 10;
        default:
            return 3;
    }
};

/** Evaluates the digit count that would be displayed on the cards based on difficulty */
export const digitCount = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            return 1;
        case 'medium':
            return 2;
        case 'hard':
            return 3;
        default:
            return 1;
    }
};
