import React, { useEffect, useState, useCallback } from 'react';
import { View, StatusBar, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../hooks/useNetStatus';
import useTheme from '../../hooks/useTheme';

import Banner from '../../components/leaderboard/Banner';
import CategoryBar from '../../components/leaderboard/CategoryBar';
import TopLeaderbord from '../../components/leaderboard/TopLeaderboard';
import LeaderboardModal from '../../components/leaderboard/LeaderboardModal';

import getStyles from '../../components/leaderboard/style/leaderboard.style';
import UserRankCard from '../../components/leaderboard/UserRankCard';

import useProfile from '../../hooks/useProfile';

export default function Leaderboard() {
    const user = useProfile();
    const { isConnected } = useNetStatus();
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const [currentCategory, setCurrentCategory] = useState('daily-scores');
    const [leaderboards, setLeaderboards] = useState({
        overall: [],
        'daily-scores': [],
        'weekly-scores': []
    });

    const [refreshing, setRefreshing] = useState(false);

    const fetchLeaderboardData = useCallback(async () => {
        try {
            if (isConnected === false) {
                Toast.show({
                    type: 'error',
                    text1: 'You are offline',
                    text2: 'You need connection to load the leaderboard',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 5000
                });
                return;
            }

            Toast.show({
                type: 'success',
                text1: 'Updating leaderboard',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });

            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER}/api/leaderboard`);

            const leaderboard = response.data;

            Toast.hide(); // Hide Toast after update
            setLeaderboards({
                overall: leaderboard['overall-scores'] || [],
                'daily-scores': leaderboard['daily-scores'] || [],
                'weekly-scores': leaderboard['weekly-scores'] || []
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
                test2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 2000
            });
        }
    }, [isConnected]);

    /** Well, if user wants it, they could just refresh the leaderboard by themselves */
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchLeaderboardData();
        setRefreshing(false);
    }, [fetchLeaderboardData]);

    useEffect(() => {
        // Leaderboard refreshes every 10 minutes
        fetchLeaderboardData();
        let fetchInterval = setInterval(
            () => {
                fetchLeaderboardData();
            },
            1000 * 60 * 10 // Cheap way of refreshing (fix this next time)
        );

        return () => clearInterval(fetchInterval);
    }, [fetchLeaderboardData]);

    const currentUserRank = user[currentCategory]?.rank;
    const currentUserScore = user[currentCategory]?.score;

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <View style={styles.leaderboardContainer}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Banner />
                    <CategoryBar
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                    />
                    <TopLeaderbord topScores={leaderboards[currentCategory].slice(0, 3)} />
                    <LeaderboardModal scores={leaderboards[currentCategory].slice(3)} />
                </ScrollView>
                <UserRankCard
                    isLogin={Boolean(user.uid)}
                    rank={currentUserRank}
                    profileImg={user?.profileImg}
                    score={currentUserScore}
                />
            </View>
        </>
    );
}
