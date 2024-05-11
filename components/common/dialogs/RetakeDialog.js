import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import styles from './dialogs.style';

export default function RetakeDialog({
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
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
            <View style={styles.modalContainer}>
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogText}>
                        <Text style={styles.dialogHeader}>RETAKE?</Text>
                        <Text style={styles.dialogDescription}>
                            Retaking this quiz will replace your current score. Previous scores can
                            not be swapped and retrieved. Your first score would be your original
                            score to be seen by your teacher.
                        </Text>
                    </View>
                    <View style={styles.confirmationWrapper}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmBtnText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
