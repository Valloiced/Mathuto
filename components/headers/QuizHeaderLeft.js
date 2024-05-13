import React from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme';

export default function QuizHeaderLeft() {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => router.back()}>
            <Text style={styles.exitBtn}>X</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    exitBtn: {
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.large,
        color: COLORS.white
    }
});
