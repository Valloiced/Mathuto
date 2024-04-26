import React, { useReducer, useEffect } from 'react';
import { View, Text } from 'react-native';

import { initialState, reducer } from './utils';

import GameAction from './GameAction';
import GameHeader from './GameHeader';

import sampleData from './test/sampleData';
import GameInput from './GameInput';

export default function GameField() {
    const [state, dispatch] = useReducer(reducer, initialState);

    /** Setup */
    useEffect(() => {
        dispatch({ type: 'SETUP', data: sampleData });
    }, []);

    return (
        <View>
            <GameHeader
                points={state.points}
                remainingLives={state.remainingLives}
            />
            <GameAction
                scrambledTerm={state.scrambledTerm}
                description={state.currentTerm.description}
                levelTheme={state.levelTheme}
                fontSize={state.fontSize}
            />
            <GameInput
                levelTheme={state.levelTheme}
                scrambledTerm={state.scrambledTerm}
                fontSize={state.fontSize}
                answerInput={state.answerInput}
                dispatch={dispatch}
            />
        </View>
    );
}
