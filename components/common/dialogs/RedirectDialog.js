import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import styles from './dialogs.style';

export default function RedirectDialog({
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
                        <Text style={styles.dialogHeader}>EXITING APP</Text>
                        <Text style={styles.dialogDescription}>
                            You are about to leave this application and visit an external website.
                            Do you want to continue?
                        </Text>
                    </View>
                    <View style={styles.confirmationWrapper}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmBtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
