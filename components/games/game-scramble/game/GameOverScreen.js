import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNetInfo } from '@react-native-community/netinfo';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { BounceIn, BounceOut, Easing } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../../../utils/firebase.utils';

import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SHADOWS,
    SIZES
} from '../../../../constants/theme';

import { Restart, HomeSolid, Scramble, Crown } from '../../../../assets/icons';
import { router } from 'expo-router';
import { GameTheme } from './utils/theme.utils';

const Status = ({ message }) => (
    <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{message}</Text>
    </View>
);

export default function GameOverScreen({
    totalPoints,
    overallPoints,
    isCompleted
}) {
    const netinfo = useNetInfo();

    const [showConfetti, setShowConfetti] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const confettiRef = useRef(null);

    useEffect(() => {
        const submitScore = async () => {
            const uidToken = await firebaseAuthService.getIdToken();

            // Add condition to score submission failure if no current user

            try {
                await axios.put(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/score/submit`,
                    { new_score: totalPoints },
                    {
                        headers: {
                            Authorization: `Bearer ${uidToken}`
                        }
                    }
                );
            } catch (error) {
                console.error(error.message);
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.',
                    text2: error.message,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
                setIsError(true);
            } finally {
                setSubmitting(false);
            }
        };

        let confettiTimeout;

        // If score is 0, then don't submit it, just wasting resources
        if (netinfo.isConnected && totalPoints) {
            submitScore();
        }

        // Show confetti
        if (
            confettiRef.current && // if confetti is mounted
            totalPoints !== 0 // if user earned a score
        ) {
            confettiRef.current.play(0);
            confettiTimeout = setTimeout(() => setShowConfetti(false), 3000);
        }

        // Just display the score if score is 0 and no connection
        if (totalPoints === 0 || !netinfo.isConnected) {
            setSubmitting(false);
        }

        // Timeout so that user would be redirected back to home page when they stayed
        // a bit long (don't know why)
        let screenTimeout = setTimeout(() => router.replace('/home'), 20000);

        return () => {
            clearTimeout(confettiTimeout);
            clearTimeout(screenTimeout);
        };
    }, [totalPoints, isCompleted, netinfo.isConnected, confettiRef]);

    BounceIn.delay(200).duration(500).easing(Easing.ease);
    BounceOut.delay(200).duration(500).easing(Easing.ease);

    return (
        <Animated.View
            style={styles.container}
            entering={BounceIn}
            exiting={BounceOut}
        >
            <View style={[styles.gameOverContainer, SHADOWS.medium]}>
                <View style={styles.gameIconWrapper}>
                    <Image
                        style={styles.gameIcon}
                        source={isCompleted ? Crown : Scramble}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.gameOverHeader}>
                    {isCompleted ? 'COMPLETED!' : 'NICELY DONE!'}
                </Text>
                {/* If there is a network, continue submitting */}
                {netinfo.isConnected ? (
                    submitting ? (
                        <Status message={'Submitting Score...'} />
                    ) : !isError ? (
                        <View style={styles.totalScoreBoard}>
                            <View style={styles.totalScoreWrapper}>
                                <Text style={styles.totalScoreHeader}>
                                    TOTAL POINTS
                                </Text>
                                <Text style={styles.totalScore}>
                                    {totalPoints}
                                </Text>
                            </View>
                            <View style={styles.totalScoreWrapper}>
                                <Text style={styles.totalScoreHeader}>
                                    OVERALL POINTS
                                </Text>
                                <View style={styles.overallPointsWrapper}>
                                    <Text style={styles.totalScore}>
                                        {overallPoints}
                                    </Text>
                                    <Text
                                        style={styles.addedPoints}
                                    >{`(+${totalPoints})`}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Status message={'Failed to submit score.'} />
                    )
                ) : (
                    <Status message={'No Internet Connection.'} />
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        disabled={submitting}
                        style={[
                            styles.button('#66FF88', submitting),
                            SHADOWS.medium
                        ]}
                        onPress={() => {
                            router.replace(`/home`);
                        }}
                    >
                        <HomeSolid size={25} color={'#113A1A'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={submitting}
                        style={[
                            styles.button('#E34D4D', submitting),
                            SHADOWS.medium
                        ]}
                        onPress={() =>
                            router.replace(`/games/math-scramble/game/topics`)
                        }
                    >
                        <Restart size={25} color={'#490000'} />
                    </TouchableOpacity>
                </View>
            </View>
            <LottieView
                ref={confettiRef}
                resizeMode="cover"
                loop={false}
                source={require('../../../../assets/confetti.json')}
                style={styles.confetti(showConfetti)}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    confetti: (showConfetti) => ({
        display: showConfetti ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
    }),
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameOverContainer: {
        width: '90%',
        flexDirection: 'column',
        paddingHorizontal: SIZES.xxLarge,
        backgroundColor: GameTheme.secondaryBgColor,
        borderWidth: 5,
        borderColor: COLORS.white,
        borderRadius: BORDER_RADIUS.medium
    },
    gameIconWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        top: (100 / 1.5) * -1,
        left: 'auto',
        width: '100%',
        height: 100
    },
    gameIcon: {
        width: '100%',
        height: '100%'
    },
    gameOverHeader: {
        alignSelf: 'center',
        fontSize: SIZES.xxLarge,
        color: COLORS.lightWhite,
        fontFamily: FONT.TorBold,
        letterSpacing: 1,
        marginTop: SIZES.xxLarge * 1.5,
        marginBottom: SIZES.large
    },
    totalScoreBoard: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.large,
        paddingVertical: SIZES.medium,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: COLORS.white,
        borderBottomColor: COLORS.white
    },
    totalScoreWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    totalScoreHeader: {
        fontSize: SIZES.medium,
        color: COLORS.lightWhite,
        fontFamily: FONT.TorBold,
        letterSpacing: 1
    },
    totalScore: {
        fontSize: SIZES.xxLarge,
        color: COLORS.lightWhite,
        fontFamily: FONT.TorBold,
        letterSpacing: 1
    },
    overallPointsWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    addedPoints: {
        fontFamily: FONT.TorRegular,
        color: '#66FF88'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SIZES.medium,
        paddingVertical: SIZES.medium,
        marginBottom: SIZES.xxLarge - SIZES.medium // marginBottom - padding (For consistent vertical alignment)
    },
    button: (bgColor, submitting) => ({
        opacity: submitting ? 0.5 : 1,
        backgroundColor: bgColor,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.xxLarge * 1.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    }),
    statusContainer: {
        paddingVertical: SIZES.xxLarge,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: COLORS.white,
        borderBottomColor: COLORS.white
    },
    statusText: {
        color: COLORS.lightWhite,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium
    }
});
