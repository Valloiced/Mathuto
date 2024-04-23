// index.js
import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Entry Point
export default function Home() {
    return (
        <SafeAreaView>
            <Redirect href="/login" />
            {/* <Redirect href="/stacks/video/yt" /> */}
        </SafeAreaView>
    );
}
