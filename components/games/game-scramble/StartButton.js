import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/startButton.style';

import { SHADOWS } from '../../../constants/theme';

export default function StartButton({ handleStart }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.startButton, SHADOWS.medium]} onPress={handleStart}>
                <Text style={styles.startBtnText}>START</Text>
            </TouchableOpacity>
        </View>
    );
}
