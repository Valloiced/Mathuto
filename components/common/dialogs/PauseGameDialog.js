import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import useTheme from '../../../hooks/useTheme';
import useSound from '../../../hooks/useSound';

import getStyles from './dialogs.style';

import { 
    VolumeSolid, 
    VolumeMuteSolid, 
    MusicSolid, 
    MusicMuteSolid 
} from '../../../assets/icons';

import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SHADOWS, SIZES } from '../../../constants/theme';
import { router } from 'expo-router';

export default function PauseGameDialog({
    isMusicMuted,
    muteMusic, 
    duckMusic, 
    revertMusic, 
    restartPath,
    modalVisible, 
    setModalVisible 
}) {
    const [theme, changeTheme] = useTheme();
    const { sounds, isMuted, playSound, muteSound } = useSound();
    const isSoundMuted = isMuted;

    const styles = getStyles(theme);
    const pauseStyles = getPauseStyles(theme);

    // Music Ducker
    useEffect(() => {
        if (modalVisible) {
            duckMusic();
        } else {
            // Reset
            revertMusic();
        }

        return () => revertMusic();
    }, [modalVisible])

    const handleContinue = () => setModalVisible(false);

    const handleRestart = () => router.replace(restartPath);

    const handleQuitGame = () => router.replace('/home');

    const handleToggleSound = () => muteSound(!isSoundMuted);
    
    const handleToggleMusic = () => muteMusic(!isMusicMuted);
    
    const gradientColors = [
        theme === 'default' ? COLORS.textPrimary : COLORS_RED.tertiary,
        theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
    ]

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} statusBarTranslucent>
            <View style={styles.modalContainer}>
                <LinearGradient
                        colors={gradientColors}
                        style={[styles.dialogContainer, pauseStyles.dialogContainer]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                    <View style={styles.dialogText}>
                        <Text style={pauseStyles.header}>PAUSED</Text>
                    </View>
                    <View style={pauseStyles.actionWrapper}>
                        <TouchableOpacity 
                            style={pauseStyles.actionBtnWrapper}
                            onPress={() => {
                                    playSound(sounds.click);
                                    handleContinue();
                            }}
                        >
                            <Text style={pauseStyles.actionText}>CONTINUE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={pauseStyles.actionBtnWrapper}
                            onPress={() => {
                                    playSound(sounds.click);
                                    handleRestart();
                            }}
                        >
                            <Text style={pauseStyles.actionText}>RESTART</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[pauseStyles.actionBtnWrapper, pauseStyles.quitGame]}
                            onPress={() => {
                                    playSound(sounds.click);
                                    handleQuitGame();
                            }}
                        >
                            <Text style={pauseStyles.actionText}>QUIT GAME</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={pauseStyles.audioOptionsContainer}>
                        <View style={pauseStyles.audioOption}>
                            <Text style={pauseStyles.audioOptionHeader}>Sound</Text>
                            <TouchableOpacity 
                                style={[pauseStyles.optionBtnWrapper(isSoundMuted), SHADOWS.medium]}
                                onPress={handleToggleSound}
                            >
                                {isSoundMuted ? (
                                    <VolumeMuteSolid color={COLORS.white} size={25} />
                                ) : (
                                    <VolumeSolid color={COLORS.white} size={25} />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={pauseStyles.audioOption}>
                            <Text style={pauseStyles.audioOptionHeader}>Music</Text>
                            <TouchableOpacity 
                                style={[pauseStyles.optionBtnWrapper(isMusicMuted), SHADOWS.medium]}
                                onPress={handleToggleMusic}
                            >
                                {isMusicMuted ? (
                                    <MusicMuteSolid color={COLORS.white} size={25} />
                                ) : (
                                    <MusicSolid color={COLORS.white} size={25} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
}

const getPauseStyles = (theme = 'default') => StyleSheet.create({
    dialogContainer: {
        borderWidth: 2,
        borderColor: COLORS.white
    },
    header: {
        color: COLORS.white,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.TorBold,
        letterSpacing: 1
    }, 
    actionWrapper: {
        flexDirection: 'column',
        gap: SIZES.small,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white
    },
    actionBtnWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.textTertiary : COLORS_RED.secondary,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.medium,
        borderWidth: 2,
        borderColor: COLORS.white
    },
    actionText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.TorBold,
        letterSpacing: 1
    },
    quitGame: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    audioOptionsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xxLarge
    },
    audioOption: {
        flexDirection: 'column',
        gap: SIZES.small,
        alignItems: 'center'
    },
    audioOptionHeader: {
        color: COLORS.white,
        fontSize: SIZES.xSmall,
        fontFamily: FONT.TorBold
    },
    optionBtnWrapper: (isMuted) => ({
        flexDirection: 'row',
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        backgroundColor: isMuted ? '#F87662' : '#09E98B',
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: SIZES.small
    })
});
