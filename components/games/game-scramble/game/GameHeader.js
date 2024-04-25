import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WrongSolid, WrongCloseSolid } from '../../../../assets/icons';
import { FONT, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

export default function GameHeader({ points, remainingLives }) {
    const remainingAttempts = new Array(3)
        .fill(0)
        .map((val, index) =>
            remainingLives > index ? (
                <WrongCloseSolid
                    key={val + index}
                    style={styles.failedAttempt}
                />
            ) : (
                <WrongSolid key={val + index} style={styles.failedAttempt} />
            )
        );

    return (
        <View style={styles.headerContainer}>
            <View style={styles.pointsWrapper}>
                <Text style={styles.pointsHeader}>POINTS</Text>
                <Text style={styles.points}>{points}</Text>
            </View>
            <View style={styles.failedAttemptWrapper}>{remainingAttempts}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    pointsWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small * -1
    },
    pointsHeader: {
        color: GameTheme.textColor,
        fontSize: SIZES.medium,
        fontFamily: FONT.MSExtraBold,
        letterSpacing: 1
    },
    points: {
        color: GameTheme.textColor,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.MSBlack
    },
    failedAttemptWrapper: {
        flexDirection: 'row',
        gap: SIZES.xxSmall
    },
    failedAttempt: {
        color: GameTheme.secondaryBgColor,
        fontSize: SIZES.xxLarge
    }
});
