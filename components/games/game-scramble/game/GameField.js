import React, { useReducer } from 'react';
import { View, Text } from 'react-native';

import { initialState, reducer } from './utils';

import GameAction from './GameAction';
import GameHeader from './GameHeader';

export default function GameField() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <View>
            <GameHeader
                points={state.points}
                remainingLives={state.remainingLives}
            />
            <GameAction />
        </View>
    );
}
