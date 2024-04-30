import React from 'react';
import { router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';

import { firebaseAuthService } from '../../utils/firebase.utils';

import { Facebook, Google } from '../../assets/icons/brands';

import styles from './styles/socialsContainer.style';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true
});

export default function SocialsContainer() {
    /** Authenticate with Google */
    const onGoogleButtonPress = async () => {
        try {
            console.log('Logging In with Google');
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });

            const userInfo = await GoogleSignin.signIn();

            await firebaseAuthService.authenticateWithGoogle(userInfo.idToken);

            console.log('Login Successfully');
            router.replace('/home');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.error('Cancelled Sign In');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.error('Signing in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.error('No Play Service');
            } else {
                // some other error happened
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.socialsContainer}>
            <Text style={styles.socialSubtitle}>Sign in with</Text>
            <View style={styles.socialOptions}>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image
                        source={Facebook}
                        style={styles.socialIcons(20)}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialIconWrapper}
                    onPress={onGoogleButtonPress}
                >
                    <Image
                        source={Google}
                        style={styles.socialIcons(20)}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
