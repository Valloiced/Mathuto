import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';

import { COLORS, SHADOWS } from '../../constants/theme';
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
    return (
        <View style={styles.formsContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <UserSolid size={25} color={COLORS.bgPrimary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="User Name"
                        placeholderTextColor={COLORS.textPrimary}
                        value={registerForm.username}
                        onChangeText={handleUsernameInput}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <MailSolid size={25} color={COLORS.bgPrimary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="Email Address"
                        placeholderTextColor={COLORS.textPrimary}
                        value={registerForm.email}
                        onChangeText={handleEmailInput}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.iconWrapper}>
                        <LockSolid size={25} color={COLORS.bgPrimary} />
                    </View>
                    <TextInput
                        style={styles.registerInput}
                        placeholder="Password"
                        placeholderTextColor={COLORS.textPrimary}
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
                                <ViewPassword size={25} color={COLORS.bgPrimary} />
                            ) : (
                                <HidePassword size={25} color={COLORS.bgPrimary} />
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
                <Text style={styles.submitBtnText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
