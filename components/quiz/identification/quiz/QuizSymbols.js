import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

function Symbols({ symbol, handlePress }) {
    const translateY = useSharedValue(-SIZES.xxSmall * 0.4);

    const handlePressIn = () => {
        translateY.value = withTiming(0, { duration: 25 });
    };

    const handlePressOut = () => {
        translateY.value = withTiming(-SIZES.xxSmall * 0.4, { duration: 50 });
    };

    const pressAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        };
    });

    return (
        <Pressable
            style={styles.accessSymbolsBtn}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
        >
            <Animated.View style={[styles.accessSymbols, pressAnimation]}>
                <Text style={styles.accessSymbolsText}>{symbol}</Text>
            </Animated.View>
        </Pressable>
    );
}

export default function QuizSymbols({ answer, availableSymbols, dispatch }) {
    const symbols = availableSymbols.map((symbol) => (
        <Symbols
            key={symbol}
            symbol={symbol}
            handlePress={() => dispatch({ type: 'ANSWERING', answer: answer + symbol })}
        />
    ));

    return (
        <View style={styles.accessSymbolsContainer}>
            <Text style={styles.accessSymbolsHeader}>Available Symbols</Text>
            <View style={styles.accessSymbolsWrapper}>{symbols}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    accessSymbolsContainer: {
        alignSelf: 'flex-start',
        gap: SIZES.xSmall
    },
    accessSymbolsHeader: {
        color: COLORS.white,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xSmall,
        letterSpacing: 1
    },
    accessSymbolsWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: SIZES.xSmall
    },
    accessSymbolsBtn: {
        flexDirection: 'column',
        backgroundColor: '#D2D2D2',
        borderRadius: BORDER_RADIUS.small
    },
    accessSymbols: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.xxSmall * 0.4,
        borderRadius: BORDER_RADIUS.small
    },
    accessSymbolsText: {
        color: COLORS.textTertiary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.medium
    }
});
