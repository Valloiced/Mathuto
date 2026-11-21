import React, { useCallback, useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES } from '../constants/theme';
import { WEB_MAX_WIDTH } from '../constants/window';

SplashScreen.preventAutoHideAsync();

// On wide web screens, show the app at phone width instead of stretching it.
const WebFrame = ({ children }) =>
    Platform.OS === 'web' ? (
        <View style={styles.webBackdrop}>
            <View style={styles.webPhone}>{children}</View>
        </View>
    ) : (
        children
    );

const styles = StyleSheet.create({
    webBackdrop: { flex: 1, alignItems: 'center', backgroundColor: COLORS.bgTertiary },
    webPhone: {
        flex: 1,
        width: '100%',
        maxWidth: WEB_MAX_WIDTH,
        overflow: 'hidden',
        backgroundColor: COLORS.lightWhite,
        boxShadow: '0 0 40px rgba(30, 33, 66, 0.15)'
    }
});

const Layout = () => {
    const [fontsLoaded, error] = useFonts({
        Mont: require('../assets/fonts/Montserrat-Regular.ttf'),
        MontBold: require('../assets/fonts/Montserrat-Bold.ttf'),
        MontSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        MontExBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
        MontMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
        MontLight: require('../assets/fonts/Montserrat-Light.ttf'),
        MontBlack: require('../assets/fonts/Montserrat-Black.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        TorusBold: require('../assets/fonts/Torus-Bold.otf'),
        TorusRegular: require('../assets/fonts/Torus-Regular.otf'),
        TorusLight: require('../assets/fonts/Torus-Light.otf')
    });

    const [loadingError, setLoadingError] = useState(null);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    } else if (error) {
        setLoadingError(error.message);
        return <Text>{loadingError}</Text>;
    } else {
        return (
            <WebFrame>
                <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false, title: 'Tabs' }}
                        />
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false, title: 'Tabs' }}
                        />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    </Stack>
                    {/* Toast message adjusted to be positioned at the top of the tab bar */}
                    <Toast bottomOffset={SIZES.xxLarge * 2} />
                </View>
            </WebFrame>
        );
    }
};

export default Layout;
