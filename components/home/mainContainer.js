import React from 'react';
import { View } from 'react-native';

import styles from './style/mainContainer.style';

import Statistics from './statistics';
import GameOptions from './gameOptions';

export default function MainContainer(statisticProps) {
    return (
        <View style={styles.mainContainer}>
            <Statistics {...statisticProps} />
            <GameOptions />
        </View>
    );
}
