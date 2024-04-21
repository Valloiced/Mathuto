import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { NavBurger } from '../../assets/icons';
import { COLORS } from '../../constants/theme';

export default function HomeHeaderLeft() {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => openDrawer()}
        >
            <NavBurger size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginLeft: 16
    }
});
