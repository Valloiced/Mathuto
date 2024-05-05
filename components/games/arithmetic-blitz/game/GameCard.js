import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, ImageBackground } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming
} from 'react-native-reanimated';

import CardBG from '../../../../assets/bg/arithmetic-blitz-card-bg.png';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

export default function GameCard({ flip, currentOper, currentValue, timer, showTimer }) {
    const spin = useSharedValue(0);
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');

    // Well, timer doesn't go past a minute so I will only format seconds
    const formatTimer = `0:${timer < 10 ? '0' + timer : timer}`;

    useEffect(() => {
        spin.value = flip;

        if (flip === 0) {
            setTimeout(() => setFrontText(`${currentOper}${currentValue}`), 200);
        }

        if (flip === 1) {
            setTimeout(() => setBackText(`${currentOper}${currentValue}`), 200);
        }
    }, [spin, flip, currentValue, currentOper]);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
                }
            ]
        };
    }, []);

    const backAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
                }
            ]
        };
    }, []);

    return (
        <View style={styles.gameCardContainer}>
            <View style={styles.timerContainer}>
                {showTimer && <Text style={styles.timer(timer)}>{formatTimer}</Text>}
            </View>
            <Animated.View style={[styles.gameCard, frontAnimatedStyle]}>
                <ImageBackground
                    source={CardBG}
                    style={styles.gameCardBG}
                    imageStyle={styles.gameCardImage}
                >
                    <Text style={styles.gameCardText}>{frontText}</Text>
                </ImageBackground>
            </Animated.View>
            <Animated.View style={[styles.gameCard, backAnimatedStyle]}>
                <ImageBackground
                    source={CardBG}
                    style={styles.gameCardBG}
                    imageStyle={styles.gameCardImage}
                >
                    <Text style={styles.gameCardText}>{backText}</Text>
                </ImageBackground>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    gameCardContainer: {
        width: '100%',
        height: height * 0.4,
        position: 'relative',
        marginTop: SIZES.xxLarge * 2.5
    },
    gameCard: {
        width: '100%',
        height: height * 0.4,
        position: 'absolute',
        backfaceVisibility: 'hidden'
    },
    gameCardBG: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.white
    },
    gameCardImage: {
        borderRadius: 20
    },
    gameCardText: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge * 2,
        color: COLORS.lightWhite
    },
    timerContainer: {
        width: '100%',
        position: 'absolute',
        marginTop: SIZES.xxLarge * -1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timer: (timer) => ({
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge,
        color: timer <= 3 ? '#F87662' : COLORS.lightWhite
    })
});
