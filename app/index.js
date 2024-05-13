// index.js
import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Entry Point
export default function Home() {
    return (
        <SafeAreaView>
            {/* <Redirect href="/quiz/identification/hkBRnZbClq4hBLXl3fZs/0NOIwBjLdiUDeDW8swBT" /> */}
            {/* <Redirect href="/stacks/quiz/WTBm3ooevW9Hnokvr3XU" /> */}
            {/* <Redirect href="/quiz/multiple-choice/WTBm3ooevW9Hnokvr3XU/Hk9vojTy8zAlqreedioJ" /> */}
            {/* <Redirect href="home" /> */}
            <Redirect href="/login" />
            {/* <Redirect href="/games/math-scramble/game/DYn3YNRP7I3N2E45NIe7" /> */}
            {/* <Redirect href="/stacks/topic/DYn3YNRP7I3N2E45NIe7/lesson/9" /> */}
            {/* <Redirect href="/games/math-scramble/game/test" /> */}
            {/* <Redirect href="/stacks/video/yt" /> */}
        </SafeAreaView>
    );
}
