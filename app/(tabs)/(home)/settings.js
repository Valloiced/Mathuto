import React from 'react';
import { ScrollView } from 'react-native';

import styles from '../../../components/settings/style/settings.style';

import PersonalInfo from '../../../components/settings/PersonalInfo';
import Password from '../../../components/settings/Password';
import ButtonContainer from '../../../components/settings/ButtonContainer';
import AppInfo from '../../../components/settings/AppInfo';

import useProfile from '../../../hooks/useProfile';

export default function Settings() {
    const user = useProfile();

    return (
        <ScrollView style={styles.settingsContainer}>
            <PersonalInfo
                uid={user.uid}
                username={user.username}
                email={user.email}
                profileImg={user?.profileImg}
            />
            <Password uid={user.uid} />
            <ButtonContainer />
            <AppInfo />
        </ScrollView>
    );
}
