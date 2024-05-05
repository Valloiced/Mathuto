import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { firebaseAuthService } from '../../utils/firebase.utils';

import { MailSolid } from '../../assets/icons';

import styles from '../../components/password-reset/style/password-reset.style';

import { COLORS, SHADOWS } from '../../constants/theme';
import Toast from 'react-native-toast-message';

export default function PasswordReset() {
    const [recoveryEmail, setRecoveryEmail] = useState('');

    const handleEmailInput = (text) => {
        setRecoveryEmail(text);
    };

    const handleResetPassword = async () => {
        try {
            await firebaseAuthService.sendPasswordReset(recoveryEmail);

            Toast.show({
                type: 'success',
                text1: 'Password Reset email sent!',
                text2: 'Please check your email for the password reset link.',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 8000
            });
            return router.back();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.passwordResetContainer}>
            <Text style={[styles.passwordResetHeader, SHADOWS.text]}>FORGOT PASSWORD?</Text>
            <Text style={styles.description}>
                Provide your account’s email for which you want to reset your password
            </Text>
            <View style={styles.inputWrapper}>
                <View style={styles.iconWrapper}>
                    <MailSolid size={25} color={COLORS.bgPrimary} />
                </View>
                <TextInput
                    style={styles.passwordResetInput}
                    placeholder="Email Address"
                    placeholderTextColor={COLORS.textPrimary}
                    value={recoveryEmail}
                    onChangeText={handleEmailInput}
                />
            </View>
            <TouchableOpacity
                style={[styles.submitBtn, SHADOWS.medium]}
                onPress={handleResetPassword}
                // disabled={isRegistering}
            >
                <Text style={styles.submitBtnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.signupWrapper}>
                <Text style={styles.subtitle}>Or Create New Account</Text>
                <Link style={styles.highlight} href="/register">
                    Sign Up
                </Link>
            </View>
        </View>
    );
}
