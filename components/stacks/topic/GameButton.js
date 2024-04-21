import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style/gameButton.style';
import { SHADOWS } from '../../../constants/theme';

export default function DetailsContainer({ name }) {
    return (
        <View style={styles.gameButtonContainer}>
            <TouchableOpacity style={[styles.gameButton, SHADOWS.medium]}>
                <Text style={styles.plusIcon}>+</Text>
                <Text style={styles.gameButtonText}>CREATE GAME</Text>
            </TouchableOpacity>
        </View>
    );
}
