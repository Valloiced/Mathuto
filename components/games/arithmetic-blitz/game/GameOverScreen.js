import React, { useState, useEffect, useRef } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../../../utils/firebase.utils';

import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';
import { Restart, HomeSolid } from '../../../../assets/icons';
import { router } from 'expo-router';

const Status = ({ message }) => (
    <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{message}</Text>
    </View>
);

export default function GameOverScreen({ modalVisible, scoreDetails }) {
    const { earnedPoints, difficulty, multiplier, totalPoints, overallPoints } =
        scoreDetails;
    const netinfo = useNetInfo();

    const [submitting, setSubmitting] = useState(true);
    const [error, setError] = useState(false);

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
                setError(true);
            } finally {
                setSubmitting(false);
            }
        };

        // If score is 0, then don't submit it, just wasting resources
        if (modalVisible && netinfo.isConnected && totalPoints) {
            submitScore();
        }

        // Show confetti
        if (modalVisible && confettiRef.current) {
            confettiRef.current.play(0);
        }

        // Just display the score if score is 0
        if (totalPoints === 0 || !netinfo.isConnected) {
            setSubmitting(true);
        }
    }, [totalPoints, modalVisible, netinfo.isConnected, confettiRef]);

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent
            >
                <View style={styles.modalContainer}>
                    <View style={styles.gameOverContainer}>
                        <Text style={styles.gameOverHeader}>GOOD JOB!</Text>
                        <View style={styles.scoreBoard}>
                            <View style={styles.scoreDetailsWrapper}>
                                <Text style={styles.scoreDetails}>
                                    Earned Points
                                </Text>
                                <Text style={styles.scoreDetails}>
                                    {earnedPoints}
                                </Text>
                            </View>
                            <View style={styles.scoreDetailsWrapper}>
                                <Text style={styles.scoreDetails}>
                                    Difficulty
                                </Text>
                                <Text
                                    style={styles.scoreDetails}
                                >{`x ${multiplier}`}</Text>
                            </View>
                        </View>
                        {/* If there is a network, continue submitting */}
                        {netinfo.isConnected ? (
                            submitting ? (
                                <Status message={'Submitting Score...'} />
                            ) : !error ? (
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
                                        <View
                                            style={styles.overallPointsWrapper}
                                        >
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
                                <HomeSolid size={30} color={'#113A1A'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={submitting}
                                style={[
                                    styles.button('#E34D4D', submitting),
                                    SHADOWS.medium
                                ]}
                                onPress={() =>
                                    router.replace(
                                        `/games/arithmetic-blitz/game/${difficulty}`
                                    )
                                }
                            >
                                <Restart size={30} color={'#490000'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <LottieView
                        ref={confettiRef}
                        resizeMode="cover"
                        loop={false}
                        source={require('../../../../assets/confetti.json')}
                        style={styles.confetti(submitting)}
                    />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    confetti: (submitting) => ({
        display: submitting ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
    }),
    modalContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textSecondary + '80' // 50% opacity
    },
    gameOverContainer: {
        width: '90%',
        flexDirection: 'column',
        paddingHorizontal: SIZES.xxLarge,
        backgroundColor: COLORS.textTertiary,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 50
    },
    gameOverHeader: {
        alignSelf: 'center',
        fontSize: SIZES.xxLarge + 4,
        color: COLORS.lightWhite,
        fontFamily: FONT.TorBold,
        letterSpacing: 1,
        marginTop: SIZES.xxLarge
    },
    scoreBoard: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: SIZES.xLarge,
        paddingHorizontal: SIZES.large
    },
    scoreDetailsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scoreDetails: {
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        fontFamily: FONT.TorBold
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
        alignItems: 'center',
        gap: SIZES.xxSmall
    },
    totalScoreHeader: {
        fontSize: SIZES.large,
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
        gap: SIZES.small,
        paddingVertical: SIZES.medium,
        marginBottom: SIZES.xxLarge - SIZES.medium // marginBottom - padding (For consistent vertical alignment)
    },
    button: (bgColor, submitting) => ({
        backgroundColor: submitting ? bgColor + 'BF' : bgColor, // 50% opacity if disabled
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
