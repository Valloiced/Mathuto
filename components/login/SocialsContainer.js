import React from 'react';
import { router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    GoogleSignin,
    statusCodes
} from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../utils/firebase.utils';
import { syncToFirebase } from '../../utils/social-auth-utils';

import { Facebook, Google } from '../../assets/icons/brands';

import styles from './styles/socialsContainer.style';
import { SIZES } from '../../constants/theme';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true
});

export default function SocialsContainer({ isLoggingIn, setIsLoggingIn }) {
    /** Authenticate with Google */
    const onGoogleButtonPress = async () => {
        setIsLoggingIn(true);
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });

            // Sign in with Google
            const userInfo = await GoogleSignin.signIn();

            // Authenticate Google Credential to firebase auth
            await firebaseAuthService.authenticateWithGoogle(userInfo.idToken);

            /** Syncing indicator */
            Toast.show({
                type: 'info',
                text1: 'Syncing with Google',
                text2: 'Loading...',
                position: 'bottom',
                autoHide: false,
                swipeable: false
            });

            // Register the account, return false if social user already registered
            const { uid } = await firebaseAuthService.getCurrentUser();
            await syncToFirebase('google', uid);

            /** Hide Signing in */
            Toast.hide();

            /** Show user they are signed in */
            Toast.show({
                type: 'success',
                text1: 'Login Successfully',
                position: 'bottom',
                bottomOffset: SIZES.xxLarge * 1.8,
                autoHide: true,
                visibilityTime: 2000
            });

            router.replace('/home');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.error('Cancelled Sign In');
                return;
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.error('Signing in progress');
                return Toast.show({
                    type: 'info',
                    text1: 'Google Sign-in: Signing-in...',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.error('No Play Service');
            } else {
                // some other error happened
                console.error(error);
                return Toast.show({
                    type: 'info',
                    text1: 'Google Sign-in: Something went wrong',
                    text2: 'Please wait for some time before signing again.',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            }
        } finally {
            setIsLoggingIn(false);
        }
    };

    const onFacebookPress = async () => {
        setIsLoggingIn(true);
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email'
            ]);

            if (result.isCancelled) {
                /** Hide Signing in */
                Toast.hide();
                throw new Error('User cancelled the login process');
            }

            // Once signed in, get the users AccessToken for firebase auth
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                /** Hide Signing in */
                Toast.hide();
                throw new Error('Something went wrong obtaining access token');
            }

            // Authenticate Facebook Credential to firebase auth
            await firebaseAuthService.authenticateWithFacebook(
                data.accessToken
            );

            Toast.show({
                type: 'info',
                text1: 'Syncing with Facebook',
                text2: 'Loading...',
                position: 'bottom',
                autoHide: false,
                swipeable: false
            });

            // Register the account, return false if social user already registered
            const { uid } = await firebaseAuthService.getCurrentUser();
            await syncToFirebase('facebook', uid);

            /** Hide Signing in */
            Toast.hide();

            /** Show user they are signed in */
            Toast.show({
                type: 'success',
                text1: 'Login Successfully',
                position: 'bottom',
                bottomOffset: SIZES.xxLarge * 1.8,
                autoHide: true,
                visibilityTime: 2000
            });

            router.replace('/home');
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <View style={styles.socialsContainer}>
            <Text style={styles.socialSubtitle}>Sign in with</Text>
            <View style={styles.socialOptions}>
                <TouchableOpacity
                    style={styles.socialIconWrapper}
                    disabled={isLoggingIn}
                    onPress={onFacebookPress}
                >
                    <Image
                        source={Facebook}
                        style={styles.socialIcons(20)}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialIconWrapper}
                    disabled={isLoggingIn}
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
