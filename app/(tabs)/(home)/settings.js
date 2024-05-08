import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import { firebaseAuthService } from '../../../utils/firebase.utils';

import styles from '../../../components/settings/style/settings.style';

import SocialIndicator from '../../../components/settings/SocialIndicator';
import PersonalInfo from '../../../components/settings/PersonalInfo';
import Password from '../../../components/settings/Password';
import ButtonContainer from '../../../components/settings/ButtonContainer';
import AppInfo from '../../../components/settings/AppInfo';

import useProfile from '../../../hooks/useProfile';
import useNetStatus from '../../../hooks/useNetStatus';

import ConfirmationDialog from '../../../components/common/dialogs/ConfirmationDialog';

export default function Settings() {
    const user = useProfile();
    const { isConnected } = useNetStatus();

    const [socialAuthInfo, setSocialAuthInfo] = useState({
        isSocialAuthenticated: false,
        socialAuthProvider: ''
    });

    /* Dialogs for profile update confirmation */
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh

    useEffect(() => {
        if (isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need network connection to update your profile',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [isConnected]);

    useEffect(() => {
        const getProvider = async () => {
            const socialAuthProvider =
                await firebaseAuthService.getCurrentProvider();

            console.log(socialAuthProvider);
            if (socialAuthProvider !== 'password' && socialAuthProvider !== 'phone') {
                setSocialAuthInfo({
                    isSocialAuthenticated: true,
                    socialAuthProvider: socialAuthProvider
                });
            }
        };

        getProvider();
    }, []);

    return (
        <>
            <ScrollView style={styles.settingsContainer}>
                {socialAuthInfo.isSocialAuthenticated && (
                    <SocialIndicator
                        provider={socialAuthInfo.socialAuthProvider}
                    />
                )}
                <PersonalInfo
                    uid={user.uid}
                    username={user.username}
                    email={user.email}
                    profileImg={user?.profileImg}
                    setModalVisible={setModalVisible}
                    setDialogCallback={setDialogCallback}
                />
                {!socialAuthInfo.isSocialAuthenticated && (
                    <Password
                        uid={user.uid}
                        setModalVisible={setModalVisible}
                        setDialogCallback={setDialogCallback}
                    />
                )}

                <ButtonContainer />
                <AppInfo />
            </ScrollView>
            <ConfirmationDialog
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dialogCallback={dialogCallback}
                setDialogCallback={setDialogCallback}
            />
        </>
    );
}
