import React from 'react';
import { View, Image, Text } from 'react-native';

import useTheme from '../../../hooks/useTheme';
import { Blitz } from '../../../assets/icons';

import getStyles from './style/header.style';

export default function Header() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.headerContainer}>
            <Image source={Blitz} style={styles.headerImg} />
            <Text style={styles.headerTitle}>ARITHMETIC BLITZ</Text>
        </View>
    );
}
