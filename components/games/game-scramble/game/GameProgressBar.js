import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BORDER_RADIUS, SHADOWS, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

export default function GameProgressBar({ levelTheme }) {
    return (
        <View style={[styles.timerBarContainer, SHADOWS.medium]}>
            <View style={styles.timerBar(levelTheme)} />
        </View>
    );
}

const styles = StyleSheet.create({
    timerBarContainer: {
        marginVertical: SIZES.xxSmall * 0.5,
        marginHorizontal: SIZES.medium,
        backgroundColor: GameTheme.textColor + 'BF',
        borderRadius: BORDER_RADIUS.large
    },
    timerBar: (levelTheme) => ({
        width: '100%',
        backgroundColor: levelTheme,
        padding: SIZES.xxSmall * 0.3,
        borderRadius: BORDER_RADIUS.xLarge
    })
});
