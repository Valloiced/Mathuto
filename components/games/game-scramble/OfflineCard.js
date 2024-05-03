import React from 'react';
import { View, Text, Image } from 'react-native';

import { Offline } from '../../../assets/icons';

import styles from './style/offlineCard.style';
import { SHADOWS } from '../../../constants/theme';

export default function OfflineCard() {
    return (
        <View style={[styles.offlineCardContainer, SHADOWS.medium]}>
            <View style={styles.iconWrapper}>
                <Offline style={styles.offlineIcon} />
            </View>
            <View style={styles.offlineWrapper}>
                <Text style={styles.cardHeader}>You are playing offline</Text>
                <Text style={styles.cardDetails}>
                    You are currently offline. Score submission is disabled.
                    Please check your network connection to submit scores.
                </Text>
            </View>
        </View>
    );
}
