import React from 'react';
import { View } from 'react-native';

import styles from './style/mainContainer.style';

import Statistics from './Statistics';
import GameOptions from './GameOptions';

export default function MainContainer(statisticProps) {
    return (
        <View style={styles.mainContainer}>
            <Statistics {...statisticProps} />
            <GameOptions />
        </View>
    );
}
