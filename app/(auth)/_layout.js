import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

import ReturnHeaderBtn from '../../components/headers/ReturnHeaderBtn';

export default function AuthLayout() {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: true,
                        headerTitle: '',
                        headerTransparent: true,
                        headerShadowVisible: false,
                        headerLeft: ReturnHeaderBtn
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        headerShadowVisible: false,
                        headerShown: true,
                        headerLeft: ReturnHeaderBtn,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: 'transparent'
                        }
                    }}
                />
                <Stack.Screen
                    name="password-reset"
                    options={{
                        headerShadowVisible: false,
                        headerShown: true,
                        headerLeft: ReturnHeaderBtn,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: 'transparent'
                        }
                    }}
                />
            </Stack>
        </>
    );
}
