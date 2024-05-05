import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
    withSpring,
    Easing,
    withDelay,
    runOnJS,
    Boun,
    BounceOut
} from 'react-native-reanimated';

import { COLORS, FONT, SIZES } from '../../../../constants/theme';

import { IconLetterings } from '../../../../assets/icons/math-scramble';

export default function GameLoading({ animationLoaded, setAnimationLoaded }) {
    const { ScrambleIconM, ScrambleIconA, ScrambleIconT, ScrambleIconH } =
        IconLetterings;

    const startDelay = 500;
    const letterDelay = 100;

    const iconM = useSharedValue({ scale: 0, translateX: 0, rotate: 0 });
    const iconA = useSharedValue({ scale: 0, translateX: 0, rotate: 0 });
    const iconT = useSharedValue({ scale: 0, translateX: 0, rotate: 0 });
    const iconH = useSharedValue({ scale: 0, translateX: 0, rotate: 0 });
    const subtitle = useSharedValue({ scale: 1, translateX: 400 });
    const iconView = useSharedValue({ scale: 1 });

    useEffect(() => {
        /** Icon Animation Scenarios */
        // Scene A: Show icon letters in a bouncy manner, letters are shuffled at first
        // Scene B: Sync all letter animations using delay, then move all of them to the left
        // Scene C: Perform spring animation to prepare for a throw animation
        // Scene D: Throw all the letters and unshuffle them in the process

        /** Icon Scene Configs  */
        const sceneAConfig = {
            duration: 500,
            dampingRatio: 0.5
        };

        const sceneBConfig = {
            duration: 500,
            easing: Easing.quad
        };

        const sceneCConfig = {
            duration: 500
        };

        const iconSize = 75;

        /** Icon Letter Animations */

        // prettier-ignore
        iconT.value = withDelay(
            startDelay + letterDelay * 0,
            withSequence(
                withSpring({ scale: 1, translateX: 0, rotate: -10 }, sceneAConfig),
                withDelay(
                    letterDelay * 3,
                    withTiming({ scale: 1, translateX: -20, rotate: 0 }, sceneBConfig)
                ),
                withSpring({ scale: 1, translateX: -10, rotate: -1 * 4 }, sceneCConfig),
                withSpring({ scale: 1, translateX: iconSize * 2, rotate: 0 })
            )
        );

        // prettier-ignore
        iconM.value = withDelay(
            startDelay + letterDelay * 1,
            withSequence(
                withSpring({ scale: 1, translateX: 0, rotate: 10 }, sceneAConfig),
                withDelay(
                    letterDelay * 2,
                    withTiming({ scale: 1, translateX: -iconSize * 1 - 17, rotate: 0 }, sceneBConfig)
                ),
                withSpring({ scale: 1, translateX: -iconSize * 1 - 17, rotate: -1 * 8 }, sceneCConfig),
                withSpring({ scale: 1, translateX: -iconSize, rotate: 0 })
            )
        );

        // prettier-ignore
        iconH.value = withDelay(
            startDelay + letterDelay * 2,
            withSequence(
                withSpring({ scale: 1, translateX: 0, rotate: -10 }, sceneAConfig),
                withDelay(
                    letterDelay * 1,
                    withTiming({ scale: 1, translateX: -iconSize * 2 - 14, rotate: 0 }, sceneBConfig)
                ),
                withSpring({ scale: 1, translateX: -iconSize * 2 - 14, rotate: -1 * 12 }, sceneCConfig),
                withSpring({ scale: 1, translateX: iconSize, rotate: 0 })
            )
        );

        // prettier-ignore
        iconA.value = withDelay(
            startDelay + letterDelay * 3,
            withSequence(
                withSpring({ scale: 1, translateX: 0, rotate: 10 }, sceneAConfig),
                withDelay(
                    letterDelay * 0,
                    withTiming({ scale: 1, translateX: -iconSize * 3 - 11, rotate: 0 }, sceneBConfig)
                ),
                withSpring({ scale: 1, translateX: -iconSize * 3 - 11, rotate: -1 * 16 }, sceneCConfig),
                withSpring({ scale: 1, translateX: -iconSize * 2, rotate: 0 }, {},
                    // After icon animation
                    () => {
                    // Start subtitle animation
                    subtitle.value = withTiming({ scale: 1, translateX: 0 }, {}, () => {
                        // Final Animation
                        subtitle.value = withSequence(
                            withTiming({ ...subtitle.value, scale: 1.1 }),
                            withTiming({ ...subtitle.value, scale: 1 })
                        );
                        iconView.value = withSequence(
                            withTiming({ scale: 1.1 }),
                            // Animation loaded (nice)
                            withTiming({ scale: 1 }, {}, () => runOnJS(setAnimationLoaded)(true))
                        );
                    });
                })
            )
        );
    }, [iconM, iconA, iconT, iconH, subtitle, iconView, setAnimationLoaded]);

    const iconMAnimation = useAnimatedStyle(() => ({
        transform: [
            { scale: iconM.value.scale },
            { rotateZ: `${iconM.value.rotate}deg` },
            { translateX: iconM.value.translateX }
        ]
    }));

    const iconAAnimation = useAnimatedStyle(() => ({
        transform: [
            { scale: iconA.value.scale },
            { rotateZ: `${iconA.value.rotate}deg` },
            { translateX: iconA.value.translateX }
        ]
    }));

    const iconTAnimation = useAnimatedStyle(() => ({
        transform: [
            { scale: iconT.value.scale },
            { rotateZ: `${iconT.value.rotate}deg` },
            { translateX: iconT.value.translateX }
        ]
    }));

    const iconHAnimation = useAnimatedStyle(() => ({
        transform: [
            { scale: iconH.value.scale },
            { rotateZ: `${iconH.value.rotate}deg` },
            { translateX: iconH.value.translateX }
        ]
    }));

    const subtitleAnimation = useAnimatedStyle(() => ({
        transform: [
            { scale: subtitle.value.scale },
            { translateX: subtitle.value.translateX }
        ]
    }));

    const iconViewAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: iconView.value.scale }]
    }));

    return (
        <View style={styles.loadingContainer}>
            <Animated.View style={styles.loadingWrapper} exiting={BounceOut}>
                <Animated.View style={[styles.iconWrapper, iconViewAnimation]}>
                    <Animated.Image
                        source={ScrambleIconT}
                        style={[styles.icon, iconTAnimation]}
                    />
                    <Animated.Image
                        source={ScrambleIconM}
                        style={[styles.icon, iconMAnimation]}
                    />
                    <Animated.Image
                        source={ScrambleIconH}
                        style={[styles.icon, iconHAnimation]}
                    />
                    <Animated.Image
                        source={ScrambleIconA}
                        style={[styles.icon, iconAAnimation]}
                    />
                </Animated.View>
                <Animated.Text style={[styles.subtitle, subtitleAnimation]}>
                    SCRAMBLE
                </Animated.Text>
                {animationLoaded && (
                    <ActivityIndicator
                        style={styles.loadingIcon}
                        size="large"
                        color={COLORS.primary}
                    />
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    loadingWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    iconWrapper: {
        flexDirection: 'row'
    },
    icon: {
        width: 75,
        height: 75
    },
    subtitle: {
        marginVertical: SIZES.xSmall,
        color: COLORS.textTertiary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 1
    },
    loadingIcon: {
        marginVertical: SIZES.large
    }
});
