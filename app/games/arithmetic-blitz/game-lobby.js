import React, { useState } from 'react';
import { StatusBar, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';

import styles from '../../../components/games/arithmetic-blitz/style/game-lobby.style';

import ReturnHeaderBtn from '../../../components/headers/ReturnHeaderBtn';
import Header from '../../../components/games/arithmetic-blitz/Header';
import Description from '../../../components/games/arithmetic-blitz/Description';
import StartButton from '../../../components/games/arithmetic-blitz/StartButton';
import GameModal from '../../../components/games/arithmetic-blitz/Modal';

import { COLORS } from '../../../constants/theme';

export default function GameLobby() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            {modalVisible && <View style={styles.overlay} />}
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerShown: true,
                    headerLeft: ReturnHeaderBtn,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: COLORS.bgTertiary
                    }
                }}
            />
            <ScrollView style={styles.gameLobbyContainer}>
                <Header />
                <Description />
            </ScrollView>
            <StartButton setModalVisible={setModalVisible} />
            <GameModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
