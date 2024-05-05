import React, { useEffect } from 'react';
import Animated, {
    FadeInUp,
    FadeOutDown,
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { StyleSheet, Text, TextInput, TouchableOpacity, Easing } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

export default function GameInput({ answer, answerStatus, handleSubmit, continueGame, dispatch }) {
    const shake = useSharedValue(0);

    const shakeAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }]
    }));

    FadeInUp.delay(200).duration(500).easing(Easing.ease);
    FadeOutDown.delay(200).duration(500).easing(Easing.ease);

    useEffect(() => {
        const handleWrongAnswer = () => {
            shake.value = withSequence(
                withTiming(10, { duration: 100 }),
                withTiming(-10, { duration: 100 }),
                withTiming(10, { duration: 100 }),
                withTiming(0, { duration: 100 })
            );
        };

        if (answerStatus.isAnswered && !answerStatus.isCorrectAnswer) {
            handleWrongAnswer();
        }
    }, [answerStatus, shake]);

    return (
        <Animated.View
            style={[styles.gameInputContainer, shakeAnimation]}
            entering={FadeInUp}
            exiting={FadeOutDown}
        >
            <Text style={styles.status}>INPUT YOUR ANSWER NOW!</Text>
            <TextInput
                name="answer"
                style={styles.answerInput(answerStatus)}
                placeholder="Your answer"
                placeholderTextColor={COLORS.textSecondary + '80'}
                value={answer}
                keyboardType="number-pad"
                textAlign={'center'}
                textAlignVertical={'center'}
                onChangeText={(text) => dispatch({ type: 'ANSWERING', answer: text })}
                editable={!answerStatus.isAnswered}
                autoFocus={!answerStatus.isAnswered}
            />
            {answerStatus.isAnswered ? (
                <TouchableOpacity style={styles.gameInputBtn} onPress={continueGame}>
                    <Text style={styles.gameInputBtnText}>CONTINUE</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.gameInputBtn} onPress={handleSubmit}>
                    <Text style={styles.gameInputBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    gameInputContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: SIZES.large,
        gap: SIZES.large,
        position: 'relative'
    },
    status: {
        alignSelf: 'center',
        color: COLORS.lightWhite,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium
    },
    answerInput: (answerStatus) => ({
        width: '90%',
        alignSelf: 'center',
        paddingVertical: SIZES.medium,
        fontSize: SIZES.large,
        fontFamily: FONT.TorBold,
        letterSpacing: 1,
        color: COLORS.textPrimary,
        backgroundColor: answerStatus.isAnswered
            ? answerStatus.isCorrectAnswer
                ? '#B9FBC8'
                : '#FEBCB2'
            : COLORS.lightWhite,
        borderWidth: answerStatus.isAnswered ? 2 : 0,
        borderColor: answerStatus.isAnswered
            ? answerStatus.isCorrectAnswer
                ? '#1C9336'
                : '#F87662'
            : COLORS.lightWhite,
        borderRadius: 10
    }),
    gameInputBtn: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.medium,
        backgroundColor: COLORS.textTertiary,
        borderRadius: 10
    },
    gameInputBtnText: {
        color: COLORS.lightWhite,
        fontSize: SIZES.large,
        fontFamily: FONT.TorBold
    }
});
