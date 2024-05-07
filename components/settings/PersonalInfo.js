import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../utils/firebase.utils';
import { uploadProfileImg } from '../../utils/upload.util';

import { User, Edit, Checkmark } from '../../assets/icons';

import { COLORS, SHADOWS } from '../../constants/theme';

import styles from './style/personalInfo.style';
import layoutStyles from './style/settings.style';

export default function PersonalInfo({
    uid,
    username,
    email,
    profileImg,
    setModalVisible,
    setDialogCallback
}) {
    const [pendingUpdates, setPendingUpdates] = useState({
        newUsername: '',
        newEmail: '',
        imagePath: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);

    const hideIndicatorOnFormUpdates = () => {
        /** If the user has updated the form once, the activity indicator could be shown
         * This hide the indicator if the user wants to update the form again
         */
        if (showIndicator) {
            setShowIndicator(false);
        }
    };

    const pickImage = async () => {
        hideIndicatorOnFormUpdates();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            const image = result.assets[0].uri;
            const croppedImage = await cropImageToSquare(image);

            setPendingUpdates({
                ...pendingUpdates,
                imagePath: croppedImage
            });
        }
    };

    const cropImageToSquare = async (uri) => {
        const { uri: croppedUri } = await manipulateAsync(
            uri,
            [{ resize: { width: 300, height: 300 } }],
            { compress: 1, format: 'png' }
        );
        return croppedUri;
    };

    /** Send updates to the server */
    const handleUpdates = async () => {
        try {
            /** Change form status */
            setIsSubmitting(true);
            setShowIndicator(true);

            let { imagePath, newUsername, newEmail } = pendingUpdates;

            const uidToken = await firebaseAuthService.getIdToken();
            let imageLink;

            /** Clear the fields now */
            setPendingUpdates({
                newUsername: '',
                newEmail: '',
                imagePath: ''
            });

            if (imagePath) {
                const uploadStatus = await uploadProfileImg('profile-image', imagePath, uid);

                /** Add toastify success message here */
                if (uploadStatus.isUploaded) {
                    imageLink = uploadStatus.url;
                    console.log('Upload Success');
                }
            }

            /** If there's no updates to this field, do not include them in the request
             * body as it will clear this fields in the database. Making them undefined will
             * exclude them to the request
             */
            newUsername = newUsername === '' ? undefined : newUsername;
            newEmail = newEmail === '' ? undefined : newEmail;

            await axios.put(
                `${process.env.EXPO_PUBLIC_SERVER}/api/profile/update`,
                {
                    new_username: newUsername,
                    new_email: newEmail,
                    new_profileImg: imageLink
                },
                {
                    headers: {
                        Authorization: `Bearer ${uidToken}`
                    }
                }
            );

            Toast.show({
                type: 'success',
                text1: 'Personal Information Updated',
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

    /** Passes a callback to the confirmation dialog which confirms the update */
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
    const handleUsernameInput = (text) => {
        hideIndicatorOnFormUpdates();
        setPendingUpdates({ ...pendingUpdates, newUsername: text });
    };

    const handleEmailInput = (text) => {
        hideIndicatorOnFormUpdates();
        setPendingUpdates({ ...pendingUpdates, newEmail: text });
    };

    const isBeingUpdated = Object.values(pendingUpdates).some((item) => item);

    return (
        <View style={layoutStyles.settingsSection}>
            <Text style={layoutStyles.settingsHeader}>Personal Info</Text>
            <View style={layoutStyles.settingsWrapper}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity
                        style={[styles.avatarWrapper, SHADOWS.medium]}
                        onPress={pickImage}
                    >
                        <Image
                            style={styles.avatarImg}
                            source={
                                !profileImg && !pendingUpdates.imagePath
                                    ? User
                                    : {
                                          uri: pendingUpdates.imagePath || profileImg
                                      }
                            }
                        />
                        <View style={styles.iconWrapper}>
                            <Edit style={styles.icon} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={layoutStyles.formWrapper}>
                    <View style={layoutStyles.textInputWrapper}>
                        <Text style={layoutStyles.textLabel}>Username</Text>
                        <TextInput
                            style={layoutStyles.textInput}
                            value={pendingUpdates.username}
                            placeholderTextColor={COLORS.textPrimary + '80'}
                            placeholder={username}
                            onChangeText={(text) => handleUsernameInput(text)}
                        />
                    </View>
                    <View style={layoutStyles.textInputWrapper}>
                        <Text style={layoutStyles.textLabel}>Email</Text>
                        <TextInput
                            style={layoutStyles.textInput}
                            value={pendingUpdates.email}
                            placeholderTextColor={COLORS.textPrimary + '80'}
                            placeholder={uid && (email || 'Add Email')}
                            onChangeText={(text) => handleEmailInput(text)}
                        />
                    </View>
                </View>
                <View style={layoutStyles.submitContainer}>
                    <TouchableOpacity
                        style={layoutStyles.submitButton(isBeingUpdated && !isSubmitting && uid)}
                        // Button is clickable if there's pending updates, the form is submitting, or the user is not login
                        disabled={!isBeingUpdated || isSubmitting || !uid}
                        onPress={handlePress}
                    >
                        <View style={layoutStyles.submitLabel}>
                            <Text style={layoutStyles.submitBtnText}>Update</Text>
                            <Checkmark style={layoutStyles.submitBtnIcon} />
                        </View>
                    </TouchableOpacity>

                    {showIndicator && (
                        <View style={layoutStyles.formIndicator}>
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color={COLORS.textPrimary} />
                            ) : (
                                <View style={layoutStyles.successMarkWrapper}>
                                    <Checkmark style={layoutStyles.successMark} />
                                </View>
                            )}
                            <Text style={layoutStyles.formIndicatorLabel(isSubmitting)}>
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
