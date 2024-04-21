import React, { useEffect, useState, useMemo } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

export default function Loading({ setLoading }) {
    // Added extra 1 second for the start message and delay
    const [countdown, setCountdown] = useState(4);
    const animatedValue = useMemo(() => new Animated.Value(0), []);

    useEffect(() => {
        const startUpInterval = setTimeout(() => {
            setCountdown((prevCount) => {
                if (countdown === 0) {
                    clearInterval(startUpInterval);
                    return prevCount;
                }
                // Animate in
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 750,
                    useNativeDriver: true
                }).start(() => {
                    // Animate out
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 750,
                        useNativeDriver: true
                    }).start();
                });
                return prevCount - 1;
            });
        }, 1500);

        return () => clearInterval(startUpInterval);
    }, [animatedValue, countdown]);

    useEffect(() => {
        let timeout;

        if (countdown === 0) {
            timeout = setTimeout(() => setLoading(false), 1000);
        }

        return () => clearTimeout(timeout);
    }, [setLoading, countdown]);

    return (
        <View style={styles.loadingContainer}>
            {/* Adjusted the countdown to not include the extra 1 second in the display */}
            <Animated.Text
                style={[styles.loadingText, { opacity: animatedValue }]}
            >
                {countdown < 1 ? 'START!' : countdown}
            </Animated.Text>
        </View>
    );
}

// Constants and styling are ignored in the game section. Constant names may not be semantically adhere to its purpose.
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        color: COLORS.white,
        fontSize: SIZES.xxLarge * 2,
        fontFamily: FONT.MSExtraBold
    }
});
