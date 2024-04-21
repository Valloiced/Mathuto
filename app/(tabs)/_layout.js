import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import {
    HomeSolid,
    QuizSolid,
    PlaySolid,
    Leaderboard
} from '../../assets/icons';

import { COLORS, SIZES } from '../../constants/theme';

const TabItemWrapper = ({ children, color }) => {
    return (
        <View style={[styles.tabItemWrapper, { backgroundColor: color }]}>
            {children}
        </View>
    );
};

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.white,
                tabBarInactiveTintColor: 'transparent',
                tabBarActiveBackgroundColor: COLORS.primary,
                tabBarInactiveBackgroundColor: COLORS.primary,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 55
                }
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItemWrapper color={color}>
                            <HomeSolid
                                size={30}
                                color={focused ? COLORS.primary : COLORS.white}
                            />
                        </TabItemWrapper>
                    )
                }}
            />
            <Tabs.Screen
                name="materials"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItemWrapper color={color}>
                            <QuizSolid
                                size={30}
                                color={focused ? COLORS.primary : COLORS.white}
                            />
                        </TabItemWrapper>
                    )
                }}
            />
            <Tabs.Screen
                name="videos"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItemWrapper color={color}>
                            <PlaySolid
                                size={30}
                                color={focused ? COLORS.primary : COLORS.white}
                            />
                        </TabItemWrapper>
                    )
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabItemWrapper color={color}>
                            <Leaderboard
                                size={30}
                                color={focused ? COLORS.primary : COLORS.white}
                            />
                        </TabItemWrapper>
                    )
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItemWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SIZES.xxSmall - 2,
        paddingHorizontal: SIZES.xLarge,
        borderRadius: 10
    }
});
