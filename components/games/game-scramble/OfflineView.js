import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style/offlineView.style';

export default function OfflineView() {
    return (
        <View style={styles.offlineViewContainer}>
            <Text style={styles.viewHeader}>No saved lessons yet</Text>
            <TouchableOpacity style={styles.goBackBtn}>
                <Text
                    style={styles.goBackBtnText}
                    onPress={() => router.replace('/home')}
                >
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>
    );
}
