import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import getStyles from '../../../components/settings/style/settings.style';

import Appearance from '../../../components/settings/Appearance';
import Preferences from '../../../components/settings/Preferences';
import PersonalInfo from '../../../components/settings/PersonalInfo';
import Password from '../../../components/settings/Password';
import ButtonContainer from '../../../components/settings/ButtonContainer';
import AppInfo from '../../../components/settings/AppInfo';

import useTheme from '../../../hooks/useTheme';
import useProfile from '../../../hooks/useProfile';
import useNetStatus from '../../../hooks/useNetStatus';

import ConfirmationDialog from '../../../components/common/dialogs/ConfirmationDialog';
import ChangeThemeDialog from '../../../components/common/dialogs/ChangeThemeDialog';

export default function Settings() {
    const user = useProfile();
    const { isConnected } = useNetStatus();
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    /* Dialogs for profile update confirmation */
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh

    /* Dialogs for changin theme */
    const [themeModalVisible, setThemeModalVisible] = useState(false);
    const [themeDialogCallback, setThemeDialogCallback] = useState(() => () => {}); // Sheesh talaga

    useEffect(() => {
        if (isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need connection to update your profile',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [isConnected]);

    return (
        <>
            <ScrollView style={styles.settingsContainer}>
                <Appearance
                    setModalVisible={setThemeModalVisible}
                    setDialogCallback={setThemeDialogCallback}
                />
                <Preferences />
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
            <ChangeThemeDialog
                modalVisible={themeModalVisible}
                setModalVisible={setThemeModalVisible}
                dialogCallback={themeDialogCallback}
                setDialogCallback={setThemeDialogCallback}
            />
        </>
    );
}
