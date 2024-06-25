import { Audio } from 'expo-av';
import { useEffect } from 'react';

export default function useSound() {
    const sounds = {
        achievementHigh: require('../assets/sounds/achievements/high-achievement.mp3'),
        achievementSuperHigh: require('../assets/sounds/achievements/super-high-achievement.wav'),
        achievementLow: require('../assets/sounds/achievements/low-achievement.wav'),
        pop1: require('../assets/sounds/streaks/game-pops-1.wav'),
        pop2: require('../assets/sounds/streaks/game-pops-2.wav'),
        pop3: require('../assets/sounds/streaks/game-pops-3.wav'),
        click: require('../assets/sounds/click.wav'),
        lose: require('../assets/sounds/game-lose.wav'),
        powerUp: require('../assets/sounds/power-up.wav'),
        whoosh: require('../assets/sounds/whoosh.wav'),
        popup: require('../assets/sounds/popup.wav'),
        clockTicking: require('../assets/sounds/clock-ticking.mp3')
    };

    const soundConfig = {
        staysActiveInBackground: false,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: 0,
        playsInSilentModeIOS: true
    };

    useEffect(() => {
        const applyConfig = async () => await Audio.setAudioModeAsync(soundConfig);

        applyConfig();
    }, []);

    const playSound = async (sound, isLooping = false) => {
        const soundInstance = new Audio.Sound();
        await soundInstance.loadAsync(sound);

        await soundInstance.playAsync();

        // Unload sound after playback to release resources
        soundInstance.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                soundInstance.unloadAsync();
            }
        });
    };

    return { sounds, playSound };
}
