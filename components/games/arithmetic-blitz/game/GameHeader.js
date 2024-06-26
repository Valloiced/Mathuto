import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

import { Heart, HeartFull, Pause } from '../../../../assets/icons';

export default function GameHeader({ remainingLives, points, difficulty, setModalVisible }) {
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
                <Text style={styles.difficulty}>{`Difficulty: ${difficulty}`}</Text>
            </View>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Pause 
                        size={25} 
                        color={COLORS.white} 
                        style={styles.pause} 
                    />
                </TouchableOpacity>
                <Text style={styles.points}>{`Points: ${points}`}</Text>
            </View>
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
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small,
        color: COLORS.lightWhite,
        textTransform: 'capitalize',
        letterSpacing: 1
    },
    points: {
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium,
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
    }),
    pause: {
        alignSelf: 'flex-end'
    }
});
