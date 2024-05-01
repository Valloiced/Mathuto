// index.js
import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Entry Point
export default function Home() {
    return (
        <SafeAreaView>
            {/* <Redirect href="/login" /> */}
            <Redirect href="/games/math-scramble/game/DYn3YNRP7I3N2E45NIe7" />
            {/* <Redirect href="/stacks/topic/DYn3YNRP7I3N2E45NIe7/lesson/9" /> */}
            {/* <Redirect href="/games/math-scramble/game/test" /> */}
            {/* <Redirect href="/stacks/video/yt" /> */}
        </SafeAreaView>
    );
}
