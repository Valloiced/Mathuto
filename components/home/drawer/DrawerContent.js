import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Toast from 'react-native-toast-message';

import useTheme from '../../../hooks/useTheme';

import { firebaseAuthService } from '../../../utils/firebase.utils';

import styles from './drawerContent.style';

import LogoDefault from '../../../assets/logo-default.png';
import LogoRed from '../../../assets/logo-red.png';

import { Logout } from '../../../assets/icons';

export default function HomeDrawerContent(props) {
    const [theme, changeTheme] = useTheme();

    const handleSignOut = async () => {
        try {
            await firebaseAuthService.logOut();

            router.replace('/login');
        } catch (error) {
            console.error('Failed to logout: ' + error.message);
            Toast.show({
                type: 'error',
                text1: `Cannot logout: Something went wrong`,
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        }

        console.log('Signing out...');
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContainer}>
                <View>
                    <View style={styles.logoContainer}>
                        <ImageBackground
                            source={theme === 'default' ? LogoDefault : LogoRed}
                            style={styles.logo}
                            imageStyle={styles.logoBg}
                        />
                    </View>
                    <DrawerItemList {...props} />
                </View>
                <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
                    <View style={styles.signOutWrapper}>
                        <Text style={styles.signOutText}>SIGN OUT</Text>
                        <Logout style={styles.signOutIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}
