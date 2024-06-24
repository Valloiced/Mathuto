import React from 'react';
import { Drawer } from 'expo-router/drawer';

import useTheme from '../../../hooks/useTheme';

import HomeDrawerContent from '../../../components/home/drawer/DrawerContent';
import HomeHeaderLeft from '../../../components/headers/HomeHeaderLeft';

import { COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

import { HomeSolid, Settings } from '../../../assets/icons';

export default function HomeLayout() {
    const [theme, changeTheme] = useTheme();

    return (
        <Drawer
            screenOptions={{
                headerShown: false,
                headerBackgroundContainerStyle: COLORS.lightWhite,
                drawerActiveTintColor: theme === 'default' ? COLORS.textTertiary : COLORS_RED.dark,
                drawerActiveBackgroundColor: theme === 'default' ? COLORS.secondary + '80' : COLORS_RED.primaryLight + '80',
                drawerInactiveTintColor: theme === 'default' ? COLORS.textSecondary + 'BF' : COLORS_RED.base,
                drawerType: 'slide'
            }}
            drawerContent={(props) => <HomeDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: 'Home',
                    title: 'Settings',
                    headerShown: true,
                    headerTitle: '',
                    headerLeft: HomeHeaderLeft,
                    headerStyle: {
                        backgroundColor: theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF'
                    },
                    drawerIcon: ({ color }) => {
                        return <HomeSolid size={20} color={color} />;
                    }
                }}
            />
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: 'Settings',
                    title: 'Settings',
                    headerShown: true,
                    headerShadowVisible: true,
                    headerLeft: HomeHeaderLeft,
                    headerTitleStyle: {
                        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
                        fontFamily: FONT.PopSemiBold,
                        fontSize: SIZES.medium
                    },
                    drawerIcon: ({ color }) => {
                        return <Settings size={20} color={color} />;
                    }
                }}
            />
        </Drawer>
    );
}
