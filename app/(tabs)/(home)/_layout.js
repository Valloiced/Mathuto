import React from 'react';
import { Drawer } from 'expo-router/drawer';

import HomeDrawerContent from '../../../components/home/drawer/DrawerContent';
import HomeHeaderLeft from '../../../components/headers/HomeHeaderLeft';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

import { HomeSolid, Settings } from '../../../assets/icons';

export default function HomeLayout() {
    return (
        <Drawer
            screenOptions={{
                headerShown: false,
                headerBackgroundContainerStyle: COLORS.lightWhite,
                drawerActiveTintColor: COLORS.textTertiary,
                drawerActiveBackgroundColor: COLORS.secondary + '80',
                drawerInactiveTintColor: COLORS.textSecondary + 'BF',
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
                        backgroundColor: COLORS.bgTertiary
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
                        color: COLORS.textPrimary,
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
