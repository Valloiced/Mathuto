import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    FadeIn
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import axios from 'axios';

import useSound from '../../../../hooks/useSound';
import useNetStatus from '../../../../hooks/useNetStatus';

import { firebaseAuthService } from '../../../../utils/firebase.utils';
import { formatTime } from './utils/quiz.utils';

import { Trophy } from '../../../../assets/icons';
import MultipleChoiceBG from '../../../../assets/bg/multiple-choice-bg.png';

import { BORDER_RADIUS, COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';

function AccuracyBar({ correctAnswers, questionCount }) {
    const accuracyBarWidth = useSharedValue(0);
    const accuracy = Math.floor((100 / questionCount) * correctAnswers);

    useEffect(() => {
        const animateBar = () => {
            accuracyBarWidth.value = withTiming(accuracy, { duration: 2000 });
        };

        animateBar();
    }, [accuracy, accuracyBarWidth]);

    const accuracyBarAnimation = useAnimatedStyle(() => ({
        width: `${accuracyBarWidth.value}%`
    }));

    return (
        <View style={styles.accuracyBarContainer}>
            <Text style={styles.accuracyLabel}>Accuracy</Text>
            <View style={styles.accuracyBarWrapper}>
                <Animated.View style={[styles.accuracyBar, accuracyBarAnimation]}>
                    <View style={styles.accuracy}>
                        <Text style={styles.accuracyText}>{accuracy}%</Text>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

export default function QuizResult({ quizId, quizDetails, quizStats, handleRetake }) {
    const { isConnected } = useNetStatus();
    const { sounds, playSound } = useSound();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        playSound(sounds.achievementHigh);
    }, []);

    useEffect(() => {
        const submitScore = async () => {
            const uidToken = await firebaseAuthService.getIdToken();

            const { correctAnswers, timeTaken } = quizStats;

            try {
                Toast.show({
                    type: 'info',
                    text1: 'Submitting Test Score',
                    text2: 'Please wait',
                    position: 'top',
                    autoHide: false,
                    swipeable: false
                });
                setSubmitting(true);
                await axios.put(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/quiz/submit`,
                    { quizId, newScore: correctAnswers, timeTaken: timeTaken },
                    {
                        headers: {
                            Authorization: `Bearer ${uidToken}`
                        }
                    }
                );

                Toast.hide();
                Toast.show({
                    type: 'success',
                    text1: 'Quiz Score Submitted',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 5000
                });
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
            } finally {
                setIsSubmitted(true);
                setSubmitting(false);
            }
        };

        // If score is 0, then don't submit it, just wasting resources
        if (isConnected && !submitting && !isSubmitted) {
            console.log('Sending score...');
            submitScore();
        }
    }, [quizStats, quizId, submitting, isSubmitted, isConnected]);

    return (
        <>
            <ImageBackground
                source={MultipleChoiceBG}
                style={styles.quizBackgroundWrapper}
                imageStyle={styles.quizBackground}
            >
                <Animated.View style={[styles.quizCard, SHADOWS.medium]} entering={FadeIn}>
                    <View style={styles.resultHeader}>
                        <Trophy style={styles.trophyIcon} />
                        <Text style={styles.resultHeaderTitle}>COMPLETED!</Text>
                    </View>
                    <AccuracyBar
                        correctAnswers={quizStats.correctAnswers}
                        questionCount={quizDetails.numOfQuestions}
                    />
                    <View style={styles.statisticsContainer}>
                        <View style={styles.statisticsWrapper}>
                            <View style={styles.statistics}>
                                <Text style={styles.statisticsLabel()}>Time Taken</Text>
                                <Text style={styles.statisticsDetail()}>
                                    {formatTime(quizStats.timeTaken)}
                                </Text>
                            </View>
                            <View style={styles.statistics}>
                                <Text style={styles.statisticsLabel('#1C9336')}>
                                    Correct Answers
                                </Text>
                                <Text style={styles.statisticsDetail('#1C9336')}>
                                    {quizStats.correctAnswers}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.statisticsWrapper}>
                            <View style={styles.statistics}>
                                <Text style={styles.statisticsLabel()}>Total Questions</Text>
                                <Text style={styles.statisticsDetail()}>
                                    {quizDetails.numOfQuestions}
                                </Text>
                            </View>
                            <View style={styles.statistics}>
                                <Text style={styles.statisticsLabel('#F87662')}>
                                    Incorrect Answers
                                </Text>
                                <Text style={styles.statisticsDetail('#F87662')}>
                                    {quizStats.incorrectAnswers}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </ImageBackground>
            <View style={styles.navigationWrapper}>
                <TouchableOpacity
                    style={styles.retakeBtn}
                    disabled={submitting}
                    onPress={() => {
                        playSound(sounds.click);
                        handleRetake();
                    }}
                >
                    <Text style={styles.retakeBtnLabel}>Retake Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.goBackBtn}
                    disabled={submitting}
                    onPress={() => {
                        playSound(sounds.click);
                        router.back();
                    }}
                >
                    <Text style={styles.goBackBtnLabel}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    quizBackgroundWrapper: {
        width: '100%',
        height: height * 0.45,
        resizeMode: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    quizBackground: {
        width: '100%',
        height: '100%'
    },
    quizCard: {
        width: '90%',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -SIZES.xxLarge * 4,
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: BORDER_RADIUS.medium
    },
    resultHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZES.small
    },
    trophyIcon: {
        fontSize: SIZES.xxLarge * 3,
        color: '#FCD116'
    },
    resultHeaderTitle: {
        color: '#FCD116',
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge
    },
    accuracyBarContainer: {
        width: '100%',
        alignSelf: 'center',
        gap: SIZES.xxSmall,
        marginVertical: SIZES.xxSmall
    },
    accuracyLabel: {
        color: COLORS.primary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    },
    accuracyBarWrapper: {
        width: '100%',
        backgroundColor: '#F87662' + '80',
        borderRadius: BORDER_RADIUS.medium
    },
    accuracyBar: {
        width: '50%',
        paddingVertical: SIZES.xxSmall * 0.3,
        backgroundColor: '#1C9336',
        borderRadius: BORDER_RADIUS.medium
    },
    accuracy: {
        position: 'absolute',
        top: -SIZES.xxSmall * 0.5,
        right: -SIZES.small * 0.5,
        width: SIZES.xLarge,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '40',
        borderRadius: BORDER_RADIUS.small
    },
    accuracyText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: COLORS.textSecondary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.xSmall
    },
    statisticsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.small
    },
    statisticsWrapper: {
        flexDirection: 'column',
        gap: SIZES.small
    },
    statistics: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.small,
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.small
    },
    statisticsLabel: (color) => ({
        color: color || COLORS.primary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    }),
    statisticsDetail: (color) => ({
        color: color || COLORS.primary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium
    }),
    navigationWrapper: {
        flex: 1,
        marginTop: SIZES.xxLarge * 2,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.small
    },
    retakeBtn: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderRadius: BORDER_RADIUS.medium
    },
    retakeBtnLabel: {
        color: COLORS.white,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    },
    goBackBtn: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: SIZES.xxSmall
    },
    goBackBtnLabel: {
        color: COLORS.tertiary,
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.medium
    }
});
