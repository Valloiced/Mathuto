import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './style/profileContainer.style';

import { User } from '../../assets/icons';
import { SHADOWS } from '../../constants/theme';
import { router } from 'expo-router';

export default function ProfileContainer({ username, profileImg = '' }) {
    return (
        <View style={styles.profileContainer}>
            <View style={[styles.imageContainer, SHADOWS.medium]}>
                <Image
                    source={!profileImg ? User : { uri: profileImg }}
                    style={styles.profileImg(120)}
                    resizeMode="contain"
                />
            </View>

            {!username ? (
                <View style={[styles.profileWrapper, styles.offlineView]}>
                    <Text style={styles.signInToSync}>Sign in to Sync Data</Text>
                    <TouchableOpacity
                        style={styles.signInBtn}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.signInBtnText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileWrapper}>
                    <Text style={styles.profileHeader}>{username || '--:--'}</Text>
                    <Text style={styles.profileDescription}>Learner</Text>
                </View>
            )}
        </View>
    );
}
