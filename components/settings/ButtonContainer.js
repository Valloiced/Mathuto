import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../utils/firebase.utils';

import { Logout } from '../../assets/icons';

import styles from './style/buttonContainer.style';

export default function ButtonContainer() {
    const handleSignOut = async () => {
        try {
            await firebaseAuthService.logOut();

            router.replace('/login');
        } catch (error) {
            console.error('Failed to logout: ' + error.message);
            Toast.show({
                type: 'error',
                text1: `Cannot logout: Something went wrong`,
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        }

        console.log('Signing out...');
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
                <View style={styles.signOutWrapper}>
                    <Text style={styles.signOutText}>SIGN OUT</Text>
                    <Logout style={styles.signOutIcon} />
                </View>
            </TouchableOpacity>
        </View>
    );
}
