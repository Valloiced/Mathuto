import React, { useState, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../../components/settings/style/settings.style';

import PersonalInfo from '../../../components/settings/PersonalInfo';
import Password from '../../../components/settings/Password';
import ButtonContainer from '../../../components/settings/ButtonContainer';
import AppInfo from '../../../components/settings/AppInfo';

import useProfile from '../../../hooks/useProfile';
import ConfirmationDialog from '../../../components/common/dialogs/ConfirmationDialog';

export default function Settings() {
    const user = useProfile();
    const netinfo = useNetInfo();

    /* Dialogs for profile update confirmation */
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh

    useEffect(() => {
        if (netinfo.isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need connection to update your profile',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [netinfo]);

    return (
        <>
            <ScrollView style={styles.settingsContainer}>
                <PersonalInfo
                    uid={user.uid}
                    username={user.username}
                    email={user.email}
                    profileImg={user?.profileImg}
                    setModalVisible={setModalVisible}
                    setDialogCallback={setDialogCallback}
                />
                <Password
                    uid={user.uid}
                    setModalVisible={setModalVisible}
                    setDialogCallback={setDialogCallback}
                />
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
