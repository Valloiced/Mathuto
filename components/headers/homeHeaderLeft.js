import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import useTheme from '../../hooks/useTheme';

import { NavBurger } from '../../assets/icons';
import { COLORS, COLORS_RED } from '../../constants/theme';

export default function HomeHeaderLeft() {
    const [theme, changeTheme] = useTheme();

    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => openDrawer()}>
            <NavBurger size={20} color={theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginLeft: 16
    }
});
