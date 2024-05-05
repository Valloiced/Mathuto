import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../../hooks/useNetStatus';
import useProfile from '../../../hooks/useProfile';

import ProfileContainer from '../../../components/home/ProfileContainer';
import MainContainer from '../../../components/home/MainContainer';

import styles from '../../../components/home/style/home.styles';

export default function Home() {
    const user = useProfile();
    const { isConnected } = useNetStatus();

    useEffect(() => {
        if (isConnected === false) {
            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'Some features would be inaccessible',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [isConnected]);

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
