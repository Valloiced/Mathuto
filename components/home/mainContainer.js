import React from 'react';
import { View } from 'react-native';

import useTheme from '../../hooks/useTheme';

import getStyles  from './style/mainContainer.style';

import Statistics from './Statistics';
import GameOptions from './GameOptions';

export default function MainContainer(statisticProps) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    return (
        <View style={styles.mainContainer}>
            <Statistics {...statisticProps} />
            <GameOptions />
        </View>
    );
}
