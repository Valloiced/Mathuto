import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style/startButton.style';
import { SHADOWS } from '../../../constants/theme';

export default function StartButton({ setModalVisible }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.startButton, SHADOWS.medium]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.startBtnText}>START</Text>
            </TouchableOpacity>
        </View>
    );
}
