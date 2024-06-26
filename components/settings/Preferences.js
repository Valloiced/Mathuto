import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { View, Text, TouchableOpacity } from 'react-native';

import useSound from '../../hooks/useSound';
import useTheme from '../../hooks/useTheme';
import useMusic from '../../hooks/useMusic';

import getStyles from './style/preferences.style';
import getLayoutStyles from './style/settings.style';

import { SIZES } from '../../constants/theme';

export default function Preferences() {
    const [theme, changeTheme] = useTheme();

    const { isMuted: isSoundMuted, muteSound } = useSound();
    const { isMuted: isMusicMuted, muteMusic } = useMusic();

    const styles = getStyles(theme);
    const layoutStyles = getLayoutStyles(theme);

    const musicTranslate = useSharedValue(0);
    const soundTranslate = useSharedValue(0);

    useEffect(() => {
        musicTranslate.value = isMusicMuted ? 0 : SIZES.xxLarge;
        soundTranslate.value = isSoundMuted ? 0 : SIZES.xxLarge;
    }, [isMusicMuted, isSoundMuted]);

    const handleMusicToggle = () => {
        musicTranslate.value = isMusicMuted ? SIZES.xxLarge : 0;
        muteMusic(!isMusicMuted);
    };

    const handleSoundToggle = () => {
        soundTranslate.value = isSoundMuted ? SIZES.xxLarge : 0;
        muteSound(!isSoundMuted);
    };

    const musicAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(musicTranslate.value, { duration: 100 }) }]
    }));

    const soundAnimation = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(soundTranslate.value, { duration: 100 }) }]
    }));

    return (
        <View style={layoutStyles.settingsSection}>
            <Text style={layoutStyles.settingsHeader}>Preferences</Text>
            <View style={layoutStyles.settingsWrapper}>
                <View style={[styles.preferenceWrapper, styles.withSeperator]}>
                    <Text style={styles.preferenceLabel}>Music</Text>
                    <TouchableOpacity 
                        style={styles.preferenceToggler(isMusicMuted)}
                        onPress={handleMusicToggle}
                    >
                        <Animated.View style={[styles.togglerKnob(isMusicMuted), musicAnimation]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.preferenceWrapper}>
                    <Text style={styles.preferenceLabel}>Sound Effects</Text>
                    <TouchableOpacity 
                        style={styles.preferenceToggler(isSoundMuted)}
                        onPress={handleSoundToggle}
                    >
                        <Animated.View style={[styles.togglerKnob(isSoundMuted), soundAnimation]} />
                    </TouchableOpacity>
                </View>    
            </View>
        </View>
    );
}
