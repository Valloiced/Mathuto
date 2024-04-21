import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

import { Heart, HeartFull } from '../../../../assets/icons';

export default function GameHeader({ remainingLives, points, difficulty }) {
    // Generate Remaining Hearts Display
    const remainingHearts = new Array(3)
        .fill(0)
        .map((val, index) => (
            <Image
                key={val + index}
                source={remainingLives > index ? HeartFull : Heart}
                style={styles.heartImg([25, 23])}
            />
        ));

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerWrapper}>
                <View style={styles.heartsContainer}>{remainingHearts}</View>
                <Text
                    style={styles.difficulty}
                >{`Difficulty: ${difficulty}`}</Text>
            </View>
            <Text style={styles.points}>{`Points: ${points}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerWrapper: {
        flexDirection: 'column',
        gap: SIZES.xSmall
    },
    difficulty: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.small,
        color: COLORS.lightWhite,
        textTransform: 'capitalize'
    },
    points: {
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large,
        color: COLORS.white,
        letterSpacing: 1
    },
    heartsContainer: {
        flexDirection: 'row',
        gap: SIZES.xxSmall
    },
    heartImg: (dimensions) => ({
        width: dimensions[0],
        height: dimensions[1],
        resizeMode: 'cover'
    })
});
