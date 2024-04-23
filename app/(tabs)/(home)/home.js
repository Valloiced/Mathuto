import React, { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import useProfile from '../../../hooks/useProfile';

import ProfileContainer from '../../../components/home/ProfileContainer';
import MainContainer from '../../../components/home/MainContainer';

import styles from '../../../components/home/style/home.styles';

export default function Home() {
    const user = useProfile();
    const netinfo = useNetInfo();

    useEffect(() => {
        if (netinfo.isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'Some features would be inaccessible',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [netinfo]);

    return (
        <>
            <ScrollView style={styles.homeContainer}>
                <ProfileContainer
                    username={user && user.username}
                    profileImg={user && user?.profileImg}
                />
                <MainContainer
                    dailyStreak={user && user.dailyStreak}
                    totalPoints={user && user.totalPoints}
                    overallRank={user && user.overall?.rank}
                    dailyRank={user && user['daily-scores']?.rank}
                />
            </ScrollView>
        </>
    );
}
