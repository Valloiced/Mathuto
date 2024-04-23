import React from 'react';
import { router } from 'expo-router';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import { Offline } from '../../../assets/icons';

import styles from './style/ytOfflineModal.style';
import { SHADOWS } from '../../../constants/theme';

export default function YTOfflineModal({
    currentPath,
    modalVisible,
    setModalVisible
}) {
    const handleBack = () => {
        setModalVisible(false);
        router.back();
    };

    const handleRetry = () => {
        setModalVisible(false);
        router.replace(currentPath);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent
        >
            <View style={styles.modalContainer}>
                <View style={styles.ytOfflineContainer}>
                    <View style={styles.iconWrapper}>
                        <Offline style={styles.icon} />
                    </View>
                    <View style={styles.ytOfflineText}>
                        <Text style={styles.offlineHeader}>
                            YOU ARE OFFLINE
                        </Text>
                        <Text style={styles.offlineDescription}>
                            You are currently offline. Please check your
                            internet connection to watch this video.
                        </Text>
                    </View>
                    <View style={styles.navWrapper}>
                        <TouchableOpacity
                            style={[styles.retryBtn, SHADOWS.medium]}
                            onPress={handleRetry}
                        >
                            <Text style={styles.retryBtnText}>Retry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.goBackLink}
                            onPress={handleBack}
                        >
                            <Text style={styles.goBackLinkText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
