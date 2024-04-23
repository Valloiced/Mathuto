import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import styles from '../style/confirmChanges.style';

export default function ConfirmChanges({
    modalVisible,
    setModalVisible,
    dialogCallback,
    setDialogCallback
}) {
    const handleCancel = () => {
        dialogCallback(false);
        setModalVisible(false);
        setDialogCallback(() => {});
    };

    const handleConfirm = () => {
        dialogCallback(true);
        setModalVisible(false);
        setDialogCallback(() => {});
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent
        >
            <View style={styles.modalContainer}>
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogText}>
                        <Text style={styles.dialogHeader}>CONFIRM CHANGES</Text>
                        <Text style={styles.dialogDescription}>
                            Please verify and review your changes before
                            proceeding.
                        </Text>
                    </View>
                    <View style={styles.confirmationWrapper}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.confirmBtnText}>
                                Apply Changes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
