import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { Image, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../hooks/useNetStatus';

import { firebaseAuthService } from '../../utils/firebase.utils';

import MathtutoIcon from '../../assets/icon.png';

import { SHADOWS, SIZES } from '../../constants/theme';
import styles from '../../components/login/styles/login.style';

import FormsContainer from '../../components/login/FormsContainer';
import SocialsContainer from '../../components/login/SocialsContainer';

export default function Login() {
    const { isConnected } = useNetStatus();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        // Check if user already login
        const checkAuth = async () => {
            // await firebaseAuthService.logOut();

            try {
                const user = await firebaseAuthService.getCurrentUser();

                if (user) {
                    console.log('User already login');
                    router.replace('/home');
                }
            } catch (error) {
                console.error('Not login yet. Continue logging in.');
            }
        };

        checkAuth();
    }, []);

    const handleEmailInput = (text) => {
        setLoginForm({ ...loginForm, email: text });
    };

    const handlePasswordInput = (text) => {
        setLoginForm({ ...loginForm, password: text });
    };

    const handleLogin = async () => {
        const { email, password } = loginForm;

        if (isConnected === false) {
            return Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need connection to login.',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }

        if (email.trim() === '' || password.trim() === '') {
            return Toast.show({
                type: 'error',
                text1: 'Missing Credentials',
                text2: 'Please fill in the login form to continue',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        }

        try {
            setIsLoggingIn(true);
            const user = await firebaseAuthService.logIn(email, password);

            if (user) {
                Toast.show({
                    type: 'success',
                    text1: 'Login Successfully',
                    position: 'bottom',
                    bottomOffset: SIZES.xxLarge * 1.8,
                    autoHide: true,
                    visibilityTime: 5000
                });
                router.replace('/home');
            } else {
                console.log('Login Failed');
            }
        } catch (error) {
            if (
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-email' ||
                error.code === 'auth/invalid-credential'
            ) {
                return Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: 'Invalid email or password. Please try again.',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } else if (error.code === 'auth/too-many-request') {
                return Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: 'Too many unsuccessful login attempts. Please try again later',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } else {
                return Toast.show({
                    type: 'error',
                    text1: 'Something went wrong',
                    text2: error.message,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            }
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <View style={styles.loginContainer}>
            <Image source={MathtutoIcon} style={styles.icon(160)} resizeMode="contain" />
            <View style={styles.formsWrapper}>
                <Text style={[styles.loginHeader, SHADOWS.text]}>LOG IN</Text>
                <FormsContainer
                    isLoggingIn={isLoggingIn}
                    loginForm={loginForm}
                    handleEmailInput={handleEmailInput}
                    handlePasswordInput={handlePasswordInput}
                    handleLogin={handleLogin}
                />
                <Text style={styles.subtitle}>OR</Text>
                <SocialsContainer />
            </View>
            <View style={styles.signupWrapper}>
                <Text style={styles.subtitle}>Don&#39;t have an account yet?</Text>
                <Link style={styles.highlight} href="/register">
                    Sign Up
                </Link>
            </View>
        </View>
    );
}
