// firebase.config.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const initializeFirebase = () => {
    // Setup firebase
    const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        authDomain: 'mathtuto-708ed.firebaseapp.com',
        projectId: 'mathtuto-708ed',
        storageBucket: 'mathtuto-708ed.appspot.com',
        messagingSenderId: '464313574732',
        measurementId: 'G-WL7TZDPF3J'
    };

    // Initialize Firebase
    try {
        const firebase = initializeApp(firebaseConfig);
        const auth = initializeAuth(firebase, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });

        return { firebase, auth };
    } catch (error) {
        console.error('Failed to initialize Firebase', error);
        throw new Error(error);
    }
};

export default initializeFirebase;
