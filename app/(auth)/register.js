import React, { useState } from 'react';
import { router } from 'expo-router';
import { firebaseAuthService, firebaseFirestoreService } from '../../utils/firebase.utils';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../hooks/useNetStatus';

import styles from '../../components/register/style/register.style';

import FormsContainer from '../../components/register/FormsContainer';
import { SIZES } from '../../constants/theme';

export default function Register() {
    const { isConnected } = useNetStatus();
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        phoneNum: '',
        phoneCountryCode: 'PH'
    });

    const [coverPassword, setCoverPassword] = useState(true);

    const [isRegistering, setIsRegistering] = useState(false);

    const togglePasswordVisibility = () => {
        setCoverPassword((prevState) => !prevState);
    };

    const handleUsernameInput = (text) => {
        setRegisterForm({ ...registerForm, username: text });
    };

    const handleEmailInput = (text) => {
        setRegisterForm({ ...registerForm, email: text });
    };

    const handlePasswordInput = (text) => {
        setRegisterForm({ ...registerForm, password: text });
    };

    const handlePhoneInput = (text) => {
        setRegisterForm({ ...registerForm, phoneNum: text });
    }

    const handleChangeCountry = (details) => {
        const countryCode = details.cca2;
        setRegisterForm({ ...registerForm, phoneCountryCode: countryCode });
    }

    const handleSubmit = async () => {
        const { username, email, password } = registerForm;

        if (isConnected === false) {
            return Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need connection to login.',
                position: 'bottom',
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
            setIsRegistering(true);
            const user = await firebaseAuthService.signUp(email, password);

            // Save user data to database
            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    username: username || '', // Ensure displayName is not undefined
                    profileImg: '',
                    metadata: { ...user.metadata },
                    dailyStreak: 1,
                    totalPoints: 0
                };

                await firebaseFirestoreService.addDocument('users', userData);

                router.push('/phone-validate');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                return Toast.show({
                    type: 'error',
                    text1: 'Registration Failed',
                    text2: 'Email already in use. Please choose a different email.',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } else if (error.code === 'auth/weak-password') {
                return Toast.show({
                    type: 'error',
                    text1: 'Registration Failed',
                    text2: 'Weak password. Please choose a stronger password.',
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
            setIsRegistering(false);
        }
    };

    return (
        <View style={styles.registerContainer}>
            <Text style={styles.registerHeader}>{`CREATE\nACCOUNT`}</Text>
            <FormsContainer
                isRegistering={isRegistering}
                registerForm={registerForm}
                handleUsernameInput={handleUsernameInput}
                handleEmailInput={handleEmailInput}
                handlePasswordInput={handlePasswordInput}
                handlePhoneInput={handlePhoneInput}
                handleChangeCountry={handleChangeCountry}
                handleSubmit={handleSubmit}
                coverPassword={coverPassword}
                togglePasswordVisibility={togglePasswordVisibility}
            />
            <View style={styles.altContainer}>
                <Text style={styles.subtitle}>OR</Text>
                <Text style={styles.loginLink} onPress={() => router.back()}>
                    Already have an account?
                </Text>
            </View>
        </View>
    );
}
