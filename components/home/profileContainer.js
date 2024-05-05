import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style/profileContainer.style';

import { User } from '../../assets/icons';
import { SHADOWS } from '../../constants/theme';

export default function ProfileContainer({ username = '--:--', profileImg = '' }) {
    return (
        <View style={styles.profileContainer}>
            <View style={[styles.imageContainer, SHADOWS.medium]}>
                <Image
                    source={!profileImg ? User : { uri: profileImg }}
                    style={styles.profileImg(120)}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.profileWrapper}>
                <Text style={styles.profileHeader}>{username}</Text>
                <Text style={styles.profileDescription}>Learner</Text>
            </View>
        </View>
    );
}
