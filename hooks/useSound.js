import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

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

    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const applyConfig = async () => {
            try {
                await Audio.setAudioModeAsync(soundConfig);

                const isMuted = JSON.parse(await AsyncStorage.getItem('is-sound-muted')) || false;
                setIsMuted(isMuted);
            } catch (error) {
                console.error('Error applying config:', error);
            }
        };
        applyConfig();
    }, []);

    // For the love of god, this is just a temporary solution
    // Please forgive me, I will refactor this next time (or never)
    useEffect(() => {
        const fetchCurrentMuteState = async () => {
            const isMuted = JSON.parse(await AsyncStorage.getItem('is-sound-muted')) || false;
            setIsMuted(isMuted);
        }

        // Fetch mute state for every 3 seconds to sync with the user changes
        const fetchInterval = setInterval(() => fetchCurrentMuteState(), 5000);
        
        return () => clearInterval(fetchInterval);
    }, [])

    const playSound = async (sound) => {
        const soundInstance = new Audio.Sound();
        await soundInstance.loadAsync(sound);
        await soundInstance.setVolumeAsync(isMuted ? 0 : 1);

        await soundInstance.playAsync();

        // Unload sound after playback to release resources
        soundInstance.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                soundInstance.unloadAsync();
            }
        });
    };

    const muteSound = async (mute = false) => {
        try {
            await AsyncStorage.setItem('is-sound-muted', JSON.stringify(mute));
            setIsMuted(mute);
        } catch (error) {
            console.error('Error muting sound:', error);
        }
    };

    return { sounds, playSound, isMuted, muteSound };
}
