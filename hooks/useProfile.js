import { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useNetStatus from './useNetStatus';

import { firebase, firebaseAuthService } from '../utils/firebase.utils';
import { getRankings } from '../utils/leaderboard.utils';

const useProfile = () => {
    const [data, setData] = useState({});

    const { isConnected } = useNetStatus();

    useEffect(() => {
        let observer;

        const retrieveData = async () => {
            try {
                // If there's network connection or login user, get updated profile data
                const user = await firebaseAuthService.getCurrentUser();

                if (isConnected && user) {
                    // This would not rely on firestore utils as we need to update this in realtime
                    // Directly using firebase on this one

                    const db = getFirestore(firebase);

                    const profileRef = query(
                        collection(db, 'users'),
                        where('uid', '==', user.uid)
                    );

                    // Retrieve real time data
                    observer = onSnapshot(profileRef, async (snapshot) => {
                        const profileData = snapshot.docs[0].data();

                        await AsyncStorage.setItem(
                            'profile',
                            JSON.stringify({ ...user, ...profileData })
                        );

                        const ranks = await getRankings(user.uid, [
                            'overall',
                            'daily-scores',
                            'weekly-scores'
                        ]);

                        setData({
                            ...profileData,
                            ...ranks
                        });
                    });
                } else {
                    const latestProfile = await AsyncStorage.getItem('profile');

                    if (latestProfile) {
                        setData(JSON.parse(latestProfile));
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        retrieveData();

        // Clean up listener
        return () => {
            if (observer) {
                observer();
            }
        };
    }, [isConnected]);

    return data;
};

export default useProfile;
