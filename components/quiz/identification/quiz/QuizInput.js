import React from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import { filterSymbols } from './utils/quiz.utils';

import IdentificationInputBG from '../../../../assets/bg/identification-input-bg.png';

import { BORDER_RADIUS, COLORS, FONT, SHADOWS, SIZES } from '../../../../constants/theme';
import QuizSymbols from './QuizSymbols';

export default function QuizInput({
    answer,
    correctAnswer,
    handleAnswer,
    isLastQuestion,
    dispatch
}) {
    const symbols = filterSymbols(correctAnswer || '');

    return (
        <>
            <Image source={IdentificationInputBG} style={styles.inputBG} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.quizInputContainer}
            >
                {symbols.length > 0 && (
                    <QuizSymbols answer={answer} availableSymbols={symbols} dispatch={dispatch} />
                )}
                <TextInput
                    name="answer"
                    value={answer}
                    style={styles.answerInput}
                    placeholder="Your answer"
                    placeholderTextColor={COLORS.textSecondary + '40'}
                    textAlignVertical={'center'}
                    onChangeText={(text) => dispatch({ type: 'ANSWERING', answer: text })}
                />
                <TouchableOpacity
                    style={[styles.quizInputBtn, SHADOWS.medium]}
                    onPress={handleAnswer}
                >
                    <Text style={styles.quizInputBtnText}>
                        {isLastQuestion ? 'FINISH' : 'SUBMIT'}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    quizInputContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.medium,
        paddingVertical: SIZES.xxLarge,
        paddingHorizontal: SIZES.large
    },
    inputBG: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        width: '100%',
        resizeMode: 'stretch'
    },
    answerInput: {
        backgroundColor: COLORS.white,
        width: '100%',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.small,
        color: COLORS.textTertiary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '1A',
        borderRadius: BORDER_RADIUS.small
    },
    quizInputBtn: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small,
        backgroundColor: COLORS.textTertiary,
        borderRadius: 10
    },
    quizInputBtnText: {
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        fontFamily: FONT.TorBold
    }
});
