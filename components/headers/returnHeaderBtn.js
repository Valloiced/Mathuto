import React from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import useTheme from '../../hooks/useTheme';

import { COLORS, COLORS_RED } from '../../constants/theme';
import { ArrowLeft } from '../../assets/icons';

export default function ReturnHeaderBtn({ backTo = '' }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const handleBack = () => {
        if (backTo) {
            router.replace(backTo);
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handleBack}>
            <ArrowLeft size={20} color={'#FFF'} />
        </TouchableOpacity>
    );
}

const getStyles = (theme = 'default') =>
    StyleSheet.create({
        btnContainer: {
            padding: 6,
            borderRadius: 50,
            backgroundColor: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary
        }
    });
