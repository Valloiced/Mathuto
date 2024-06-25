import React from 'react';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import useTheme from '../../hooks/useTheme';

import { Mail, Lock } from '../../assets/icons';

import { COLORS, COLORS_RED, SHADOWS } from '../../constants/theme';
import styles from './styles/formsContainer.style';

export default function FormsContainer({
    isLoggingIn,
    loginForm,
    handleEmailInput,
    handlePasswordInput,
    handleLogin
}) {
    const [theme, changeTheme] = useTheme();
    return (
        <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, SHADOWS.small]}>
                <Mail style={styles.loginIcon} size={20} color={COLORS.white} />
                <TextInput
                    name="email"
                    style={styles.loginInput}
                    placeholder="Email Address"
                    placeholderTextColor={
                        theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary
                    }
                    value={loginForm.email}
                    onChangeText={handleEmailInput}
                />
            </View>
            <View style={[styles.inputWrapper, SHADOWS.small]}>
                <Lock style={styles.loginIcon} size={20} color={COLORS.white} />
                <TextInput
                    name="password"
                    style={styles.loginInput}
                    placeholder="Password"
                    placeholderTextColor={
                        theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary
                    }
                    value={loginForm.password}
                    onChangeText={handlePasswordInput}
                    secureTextEntry={true}
                />
            </View>
            <Link style={styles.loginLink} href={'/password-reset'} push>
                Forgot Password?
            </Link>
            <TouchableOpacity
                style={[styles.submitBtn(isLoggingIn), SHADOWS.medium]}
                onPress={handleLogin}
                disabled={isLoggingIn}
            >
                <Text style={styles.submitBtnText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
