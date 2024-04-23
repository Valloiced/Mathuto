import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../utils/firebase.utils';

import { Checkmark } from '../../assets/icons';

import styles from './style/password.style';
import layoutStyles from './style/settings.style';
import { COLORS } from '../../constants/theme';

export default function Password({ uid, setModalVisible, setDialogCallback }) {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [inputFailStatus, setInputFailStatus] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);

    const hideIndicatorOnFormUpdates = () => {
        /** If the user has updated the form once, the activity indicator could be shown
         * This hide the indicator if the user wants to update the form again
         */
        if (showIndicator) {
            setShowIndicator(false);
        }
    };

    const validateForm = async () => {
        try {
            let { currentPassword, newPassword, confirmPassword } =
                passwordForm;

            const user = await firebaseAuthService.getCurrentUser();
            const passwordMatch =
                await firebaseAuthService.reauthenticateWithPassword(
                    user.email,
                    currentPassword
                );

            if (!currentPassword || !newPassword || !confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Missing Credentials',
                    text2: 'Please completely fill in the form to continue.',
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
                setInputFailStatus({
                    currentPassword: !currentPassword,
                    newPassword: !newPassword,
                    confirmPassword: !confirmPassword
                });
                return;
            } else {
                setInputFailStatus({
                    currentPassword: false,
                    newPassword: false,
                    confirmPassword: false
                });
            }

            if (!passwordMatch) {
                Toast.show({
                    type: 'error',
                    text1: 'Password Update Failed',
                    text2: `Your current password and your current input doesn't match.`,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
                setInputFailStatus((prevStatus) => ({
                    ...prevStatus,
                    currentPassword: true
                }));
                return;
            } else {
                setInputFailStatus((prevStatus) => ({
                    ...prevStatus,
                    currentPassword: false
                }));
            }

            if (newPassword !== confirmPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Password Update Failed',
                    text2: `Password confirmation doesn't match`,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
                setInputFailStatus((prevStatus) => ({
                    ...prevStatus,
                    newPassword: true,
                    confirmPassword: true
                }));
                return;
            } else {
                setInputFailStatus((prevStatus) => ({
                    ...prevStatus,
                    newPassword: false,
                    confirmPassword: false
                }));
            }

            return newPassword;
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdates = async () => {
        try {
            const newPassword = await validateForm();
            const uidToken = await firebaseAuthService.getIdToken();

            if (!newPassword) {
                return;
            }

            /** Change form status */
            setIsSubmitting(true);
            setShowIndicator(true);

            /** Clear the fields now */
            setPasswordForm({
                newUsername: '',
                newEmail: '',
                imagePath: ''
            });

            await axios.put(
                `${process.env.EXPO_PUBLIC_SERVER}/api/profile/update`,
                {
                    new_password: newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${uidToken}`
                    }
                }
            );

            Toast.show({
                type: 'success',
                text1: 'Password Updated',
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });

            /** Might reauthenticate at times, but usually this will just refresh the page to update screen */
            router.navigate('/login');
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Something went wrong.',
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePress = () => {
        const callback = (value) => {
            if (value) {
                handleUpdates();
            }
        };

        setDialogCallback(() => callback);
        setModalVisible(true);
    };

    /** Text Input handlers */
    const handleCurrentPasswordInput = (text) => {
        hideIndicatorOnFormUpdates();
        setPasswordForm({ ...passwordForm, currentPassword: text });
    };

    const handleNewPasswordInput = (text) => {
        hideIndicatorOnFormUpdates();
        setPasswordForm({ ...passwordForm, newPassword: text });
    };

    const handleConfirmPasswordInput = (text) => {
        hideIndicatorOnFormUpdates();
        setPasswordForm({ ...passwordForm, confirmPassword: text });
    };

    const isBeingUpdated = Object.values(passwordForm).some((item) => item);

    return (
        <View style={layoutStyles.settingsSection}>
            <Text style={layoutStyles.settingsHeader}>Password</Text>
            <View style={layoutStyles.settingsWrapper}>
                <View style={styles.formWrapper}>
                    <View style={layoutStyles.textInputWrapper}>
                        <Text style={layoutStyles.textLabel}>
                            Current Password
                        </Text>
                        <TextInput
                            style={[
                                layoutStyles.textInput,
                                styles.textInput(
                                    inputFailStatus.currentPassword
                                )
                            ]}
                            value={passwordForm.currentPassword}
                            onChangeText={(text) =>
                                handleCurrentPasswordInput(text)
                            }
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={layoutStyles.formWrapper}>
                    <View style={layoutStyles.textInputWrapper}>
                        <Text style={layoutStyles.textLabel}>New Password</Text>
                        <TextInput
                            style={[
                                layoutStyles.textInput,
                                styles.textInput(inputFailStatus.newPassword)
                            ]}
                            value={passwordForm.newPassword}
                            onChangeText={(text) =>
                                handleNewPasswordInput(text)
                            }
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={layoutStyles.textInputWrapper}>
                        <Text style={layoutStyles.textLabel}>
                            Confirm Password
                        </Text>
                        <TextInput
                            style={[
                                layoutStyles.textInput,
                                styles.textInput(
                                    inputFailStatus.confirmPassword
                                )
                            ]}
                            value={passwordForm.confirmPassword}
                            onChangeText={(text) =>
                                handleConfirmPasswordInput(text)
                            }
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={layoutStyles.submitContainer}>
                    <TouchableOpacity
                        style={layoutStyles.submitButton(
                            isBeingUpdated && !isSubmitting && uid
                        )}
                        // Button is clickable if there's pending updates, the form is submitting, or the user is not login
                        disabled={!isBeingUpdated || isSubmitting || !uid}
                        onPress={handlePress}
                    >
                        <View style={layoutStyles.submitLabel}>
                            <Text style={layoutStyles.submitBtnText}>
                                Update
                            </Text>
                            <Checkmark style={layoutStyles.submitBtnIcon} />
                        </View>
                    </TouchableOpacity>

                    {showIndicator && (
                        <View style={layoutStyles.formIndicator}>
                            {/* Add condition if updates failed */}
                            {isSubmitting ? (
                                <ActivityIndicator
                                    size="small"
                                    color={COLORS.textPrimary}
                                />
                            ) : (
                                <View style={layoutStyles.successMarkWrapper}>
                                    <Checkmark
                                        style={layoutStyles.successMark}
                                    />
                                </View>
                            )}

                            <Text
                                style={layoutStyles.formIndicatorLabel(
                                    isSubmitting
                                )}
                            >
                                {isSubmitting ? 'Updating...' : 'Updated'}
                            </Text>
                        </View>
                    )}

                    {/* Render if user is not login */}
                    {!uid && (
                        <View style={layoutStyles.formIndicator}>
                            <Text
                                style={[
                                    layoutStyles.formIndicatorLabel(),
                                    layoutStyles.loginRequired
                                ]}
                            >
                                Login Required
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}
