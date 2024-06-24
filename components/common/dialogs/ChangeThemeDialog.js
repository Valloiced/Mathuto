import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles  from './dialogs.style';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

export default function ConfirmationDialog({
    modalVisible,
    setModalVisible,
    dialogCallback,
    setDialogCallback
}) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const [pickedTheme, setPickedTheme] = useState('default');

    const handleCancel = () => {
        dialogCallback(false);
        setModalVisible(false);
        setDialogCallback(() => {});
    };

    const handleConfirm = () => {
        dialogCallback(pickedTheme);
        setModalVisible(false);
        setDialogCallback(() => {});
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
            <View style={styles.modalContainer}>
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogText}>
                        <Text style={styles.dialogHeader}>CHANGE THEME</Text>
                    </View>
                    <View style={themeStyles.radioThemeContainer}>
                        <TouchableOpacity 
                            style={themeStyles.radioTheme}
                            onPress={() => setPickedTheme('default')}
                        >
                            <View style={themeStyles.radioThemeIcon}>
                                {pickedTheme === 'default' && <View style={themeStyles.radioThemeIconActive} />}
                            </View>
                            <Text style={themeStyles.radioThemeLabel}>Blue (Default)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={themeStyles.radioTheme}
                            onPress={() => setPickedTheme('red')}
                        >
                            <View style={themeStyles.radioThemeIcon}>
                                {pickedTheme === 'red' && <View style={themeStyles.radioThemeIconActive} />}
                            </View>
                            <Text style={themeStyles.radioThemeLabel}>Red</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.confirmationWrapper}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.confirmBtnText}>Change Theme</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const themeStyles = StyleSheet.create({
    radioThemeContainer: {
        flexDirection: 'column',
        gap: SIZES.small
    },
    radioTheme: {
        flexDirection: 'row',
        gap: SIZES.small  
    },
    radioThemeIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '80',
        borderRadius: BORDER_RADIUS.xxLarge * 10
    },
    radioThemeIconActive: {
        width: 12,
        height: 12,
        backgroundColor: COLORS.textSecondary + '80',
        borderRadius: BORDER_RADIUS.xxLarge * 10
    },
    radioThemeLabel: {
        color: COLORS.textSecondary,
        fontFamily: FONT.MSMedium,
        fontSize: SIZES.small
    }
});
