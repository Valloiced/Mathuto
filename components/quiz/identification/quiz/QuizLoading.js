import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../../constants/theme';

export default function QuizLoading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.tertiary} />
            <Text style={styles.loadingText}>Loading Quiz...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.small,
        backgroundColor: COLORS.white
    },
    loadingText: {
        color: COLORS.tertiary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large
    }
});
