import React from 'react';
import { View, Image, Text } from 'react-native';

import { Blitz } from '../../../assets/icons';

import styles from './style/header.style';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Image source={Blitz} style={styles.headerImg} />
            <Text style={styles.headerTitle}>ARITHMETIC BLITZ</Text>
        </View>
    );
}
