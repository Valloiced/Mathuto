import React from 'react';
import { router } from 'expo-router';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/modal.style';

import { SHADOWS } from '../../../constants/theme';

export default function GameModal({ modalVisible, setModalVisible }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const handlePress = (route) => {
        // Set the visibility as false first or else modal would appear in different parts of app
        setModalVisible(false);

        router.push(route);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.modalHeader}>SELECT DIFFICULTY</Text>
                        <View style={styles.difficultiesWrapper}>
                            <TouchableOpacity
                                style={[styles.difficultyButton, SHADOWS.medium]}
                                onPress={() => handlePress('/games/arithmetic-blitz/game/easy')}
                            >
                                <Text style={styles.difficultyBtnText}>EASY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.difficultyButton, SHADOWS.medium]}
                                onPress={() => handlePress('/games/arithmetic-blitz/game/medium')}
                            >
                                <Text style={styles.difficultyBtnText}>MEDIUM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.difficultyButton, SHADOWS.medium]}
                                onPress={() => handlePress('/games/arithmetic-blitz/game/hard')}
                            >
                                <Text style={styles.difficultyBtnText}>HARD</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalNote}>
                            Note: Higher difficulty means greater points
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
