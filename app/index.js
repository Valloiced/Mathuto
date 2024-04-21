// index.js
import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    return (
        <SafeAreaView>
            {/* <Redirect href="/settings" /> */}
            <Redirect href="/home" />
            {/* <Redirect href="/login" /> */}
            {/* <Redirect href="/password-reset" /> */}
            {/* <Redirect href="/stacks/video/yt/IshPbnP3vk8" /> */}
            {/* <Redirect href="/games/arithmetic-blitz/game/easy" /> */}
        </SafeAreaView>
    );
}
