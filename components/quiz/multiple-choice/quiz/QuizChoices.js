import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';
import Animated, { BounceInRight, FadeOut } from 'react-native-reanimated';

export default function QuizChoices({ choosenAnswer, choices, handleAnswer, answerStatus }) {
    const renderChoices = choices.map((choice, index) => {
        const enterAnimation = BounceInRight.delay(index * 50);
        const exitAnimation = FadeOut.delay(index);

        const isChooseAnswer = choosenAnswer === choice && answerStatus.isAnswered;
        return (
            <Animated.View key={choice} entering={enterAnimation} exiting={exitAnimation}>
                <TouchableOpacity
                    style={styles.choiceWrapper(isChooseAnswer, answerStatus.isCorrect)}
                    onPress={() => handleAnswer(choice)}
                    disabled={answerStatus.isAnswered}
                >
                    <Text style={styles.choiceText(isChooseAnswer, answerStatus.isCorrect)}>
                        {choice}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        );
    });

    return (
        <View style={styles.choices}>
            <View style={styles.choicesContainer}>{renderChoices}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    choices: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    choicesContainer: {
        width: '90%',
        gap: SIZES.small
    },
    choiceWrapper: (isChoosen, isCorrect) => ({
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.xSmall,
        borderWidth: 2,
        borderColor: isChoosen ? (isCorrect ? '#1C9336' : '#F87662') : COLORS.primary,
        backgroundColor: isChoosen ? (isCorrect ? '#B9FBC8' : '#FEBCB2') : COLORS.white,
        borderRadius: BORDER_RADIUS.medium
    }),
    choiceText: (isChoosen, isCorrect) => ({
        color: isChoosen ? (isCorrect ? '#1C9336' : '#B63D3D') : COLORS.textSecondary + 'BF',
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.small
    })
});
