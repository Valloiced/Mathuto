import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Profile } from 'react-native-fbsdk-next';
import axios from 'axios';

import { firebaseFirestoreService } from './firebase.utils';

/** Creates a user data account in the firestore for player tracking */
const syncToFirebase = async (socialAuth, uid) => {
    try {
        const isUserExist = await axios.get(
            `${process.env.EXPO_PUBLIC_SERVER}/api/profile/${uid}`
        );

        /** If social user already has a registered account, return  */
        if (isUserExist.data?.user) {
            return false;
        }

        let userData = {
            uid: uid,
            email: '',
            username: '', // Ensure displayName is not undefined
            profileImg: '',
            dailyStreak: 1,
            totalPoints: 0
        };

        if (socialAuth === 'google') {
            const googleData = await GoogleSignin.getCurrentUser();

            userData = {
                ...userData,
                email: googleData.user.email || '',
                username: googleData.user.name || '',
                profileImg: googleData.user.photo || ''
            };
        } else if (socialAuth === 'facebook') {
            const facebookData = await Profile.getCurrentProfile();

            userData = {
                ...userData,
                email: facebookData.email || '',
                username: facebookData.name || '',
                profileImg: facebookData.imageURL || ''
            };
        } else {
            return;
        }

        await firebaseFirestoreService.addDocument('users', userData);

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    syncToFirebase
};
