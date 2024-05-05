import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence
} from 'react-native-reanimated';

import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

import GameProgressBar from './GameProgressBar';
import GameBanner from './GameBanner';

export default function GameAction({
    term,
    scrambledTerm,
    description,
    levelTheme,
    fontSize,
    shuffle,
    reset,
    levelDuration,
    isCancelled,
    answerStatus,
    showBanner,
    setShowBanner
}) {
    const charScale = useSharedValue(1);

    const animateShuffle = useCallback(() => {
        charScale.value = withSequence(
            withSpring(1.5, {
                duration: 100,
                stiffness: 105
            }),
            withSpring(1, {
                duration: 100,
                stiffness: 105
            })
        );
    }, [charScale]);

    useEffect(() => {
        animateShuffle();
    }, [shuffle, animateShuffle]);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: charScale.value }]
    }));

    const generateScrambledWord = () => {
        return scrambledTerm.map((word, i) => (
            <View key={i} style={styles.scrambledWord}>
                {attachTextTag(word, i)}
            </View>
        ));
    };

    const attachTextTag = (word, index) => {
        return word.map((char, i) => {
            return (
                <Animated.Text
                    key={`${index}_${i}`}
                    style={[
                        styles.scrambledWord,
                        SHADOWS.text,
                        {
                            fontSize: fontSize,
                            color: levelTheme
                        },
                        animatedStyles // Apply shuffle animation style
                    ]}
                >
                    {char}
                </Animated.Text>
            );
        });
    };

    return (
        <View style={styles.gameActionContainer}>
            {showBanner && (
                <GameBanner answerStatus={answerStatus} term={term} setShowBanner={setShowBanner} />
            )}
            <View style={styles.scrambledWordWrapper}>{generateScrambledWord()}</View>
            <GameProgressBar
                levelTheme={levelTheme}
                levelDuration={levelDuration}
                reset={reset}
                isCancelled={isCancelled}
            />
            <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameActionContainer: {
        marginVertical: SIZES.xLarge
    },
    gameActionBanner: {
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        top: -SIZES.medium,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        backgroundColor: GameTheme.correctBgColor,
        borderWidth: 1,
        borderColor: GameTheme.correctTextColor
    },
    bannerSubtitle: {
        color: GameTheme.correctTextColor,
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    bannerStatus: {
        color: GameTheme.correctTextColor,
        fontFamily: FONT.MSBlack,
        fontSize: SIZES.large
    },
    scrambledWordWrapper: {
        height: height * 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: SIZES.xxSmall * -1
    },
    scrambledWord: {
        flexDirection: 'row',
        gap: SIZES.small,
        color: COLORS.textSecondary,
        fontFamily: FONT.MSBlack,
        textTransform: 'uppercase'
    },
    descriptionWrapper: {
        height: height * 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SIZES.medium
    },
    description: {
        color: GameTheme.textColor,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.small,
        textAlign: 'center',
        letterSpacing: 1
    }
});
