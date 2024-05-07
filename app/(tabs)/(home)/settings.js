import React, { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
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
import ConfirmChanges from '../../../components/settings/dialogs/ConfirmChanges';

export default function Settings() {
    const user = useProfile();
    const netinfo = useNetInfo();

    const [socialAuthInfo, setSocialAuthInfo] = useState({
        isSocialAuthenticated: false,
        socialAuthProvider: ''
    });

    /* Dialogs for profile update confirmation */
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh

    useEffect(() => {
        if (netinfo.isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need network connection to update your profile',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [netinfo]);

    useEffect(() => {
        const getProvider = async () => {
            const socialAuthProvider =
                await firebaseAuthService.getCurrentProvider();

            if (socialAuthProvider !== 'password') {
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
            <ConfirmChanges
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dialogCallback={dialogCallback}
                setDialogCallback={setDialogCallback}
            />
        </>
    );
}
