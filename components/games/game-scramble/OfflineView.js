import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/offlineView.style';

export default function OfflineView() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.offlineViewContainer}>
            <Text style={styles.viewHeader}>No saved lessons yet</Text>
            <TouchableOpacity style={styles.goBackBtn}>
                <Text style={styles.goBackBtnText} onPress={() => router.replace('/home')}>
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>
    );
}
