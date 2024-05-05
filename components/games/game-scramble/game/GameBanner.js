import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
    LightSpeedInRight,
    LightSpeedOutLeft,
    runOnJS
} from 'react-native-reanimated';

import { FONT, SIZES } from '../../../../constants/theme';
import { GameTheme } from './utils/theme.utils';

export default function GameBanner({ answerStatus, term, setShowBanner }) {
    const { isCorrectAnswer } = answerStatus;

    const closeBanner = () => {
        setTimeout(() => setShowBanner(false), 2000);
    };

    const enterAnimation = LightSpeedInRight.withCallback(() =>
        runOnJS(closeBanner)()
    );

    return (
        <Animated.View
            style={styles.gameActionBanner(isCorrectAnswer)}
            entering={enterAnimation}
            exiting={LightSpeedOutLeft}
        >
            <Text style={styles.bannerSubtitle(isCorrectAnswer)}>
                {isCorrectAnswer ? 'The answer is' : 'Correct Answer'}
            </Text>
            <Text style={styles.bannerStatus(isCorrectAnswer)}>
                {isCorrectAnswer ? 'Correct' : term}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    gameActionBanner: (isCorrectAnswer) => ({
        position: 'absolute',
        flexDirection: 'column',
        width: '100%',
        top: -SIZES.medium,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        backgroundColor: isCorrectAnswer
            ? GameTheme.correctBgColor
            : GameTheme.wrongBgColor,
        borderWidth: 1,
        borderColor: isCorrectAnswer
            ? GameTheme.correctTextColor
            : GameTheme.wrongTextColor
    }),
    bannerSubtitle: (isCorrectAnswer) => ({
        color: isCorrectAnswer
            ? GameTheme.correctTextColor
            : GameTheme.wrongTextColor,
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.small,
        letterSpacing: 1
    }),
    bannerStatus: (isCorrectAnswer) => ({
        color: isCorrectAnswer
            ? GameTheme.correctTextColor
            : GameTheme.wrongTextColor,
        fontFamily: FONT.MSBlack,
        fontSize: SIZES.large,
        textTransform: 'uppercase'
    })
});
