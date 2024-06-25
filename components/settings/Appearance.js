import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';

import useTheme from '../../hooks/useTheme';

import getLayoutStyles from './style/settings.style';
import styles from './style/appearance.style';

import { SHADOWS } from '../../constants/theme';

export default function Appearance({ setModalVisible, setDialogCallback }) {
    const [theme, changeTheme] = useTheme();

    const layoutStyles = getLayoutStyles(theme);

    const handlePress = () => {
        const callback = async (newTheme) => {
            if (newTheme) {
                await changeTheme(newTheme);
                RNRestart.restart();
            }
        };

        setDialogCallback(() => callback);
        setModalVisible(true);
    };

    return (
        <View style={layoutStyles.settingsSection}>
            <Text style={layoutStyles.settingsHeader}>Appearance</Text>
            <View style={layoutStyles.settingsWrapper}>
                <View style={styles.themeContainer}>
                    <Text style={layoutStyles.textLabel}>Theme</Text>
                    <View style={styles.themeWrapper}>
                        <View style={styles.theme(theme)} />
                        <TouchableOpacity
                            style={[styles.changeTheme, SHADOWS.small]}
                            onPress={handlePress}
                        >
                            <Text style={styles.changeThemeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
