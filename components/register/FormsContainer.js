import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import useTheme from '../../hooks/useTheme';

import { COLORS, COLORS_RED, SHADOWS } from '../../constants/theme';
import styles from './style/formsContainer.style';

import { UserSolid, MailSolid, LockSolid, ViewPassword, HidePassword } from '../../assets/icons';

export default function FormsContainer({
    isRegistering,
    registerForm,
    handleUsernameInput,
    handleEmailInput,
    handlePasswordInput,
    handleSubmit,
    coverPassword,
    togglePasswordVisibility
}) {
    const [theme, changeTheme] = useTheme();

    return (
        <View style={styles.formsContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <UserSolid size={25} color={theme === 'default' ? COLORS.bgPrimary : COLORS_RED.primary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="User Name"
                        placeholderTextColor={theme === 'default' ? theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark : COLORS_RED.dark}
                        value={registerForm.username}
                        onChangeText={handleUsernameInput}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <MailSolid size={25} color={theme === 'default' ? COLORS.bgPrimary : COLORS_RED.primary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="Email Address"
                        placeholderTextColor={theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark}
                        value={registerForm.email}
                        onChangeText={handleEmailInput}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <LockSolid size={25} color={theme === 'default' ? COLORS.bgPrimary : COLORS_RED.primary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="Password"
                        placeholderTextColor={theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark}
                        value={registerForm.password}
                        onChangeText={handlePasswordInput}
                        secureTextEntry={coverPassword}
                    />
                    {registerForm.password && (
                        <TouchableOpacity
                            style={[styles.iconWrapper, styles.passwordIcon]}
                            onPress={togglePasswordVisibility}
                        >
                            {coverPassword ? (
                                <ViewPassword size={25} color={theme === 'default' ? COLORS.bgPrimary : COLORS_RED.primary} />
                            ) : (
                                <HidePassword size={25} color={theme === 'default' ? COLORS.bgPrimary : COLORS_RED.primary} />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <TouchableOpacity
                style={[styles.submitBtn(isRegistering), SHADOWS.medium]}
                onPress={handleSubmit}
                disabled={isRegistering}
            >
                <Text style={styles.submitBtnText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
