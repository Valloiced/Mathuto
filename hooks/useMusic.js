import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export default function useMusic() {
    const music = {
        easy: require('../assets/music/music1/loop.wav'),
        easyAlt: require('../assets/music/music1/loop-alt.wav'),
        medium: require('../assets/music/music2/loop.wav'),
        mediumAlt: require('../assets/music/music1/loop-alt.wav'),
        hard: require('../assets/music/music3/loop.wav'),
        hardAlt: require('../assets/music/music3/loop-alt.wav'),
        timer: require('../assets/music/timer.wav')
    };

    let soundConfig = {
        staysActiveInBackground: false,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: 0,
        playsInSilentModeIOS: true
    };

    const [playback, setPlayback] = useState(new Audio.Sound());
    const [loadedMusic, setLoadedMusic] = useState([]);
    const [playingMusic, setPlayingMusic] = useState(0);
    const [musicListLoaded, setMusicListLoaded] = useState(false);
    const [volume, setVolume] = useState(0.6); // Default
    const [isMuted, setIsMuted] = useState(false);

    // Apply Config
    useEffect(() => {
        const applyConfig = async () => {
            try {
                const response = await AsyncStorage.getItem('music-vol');
                const currentVol = response ? JSON.parse(response) : volume;
                soundConfig = { ...soundConfig, volume: currentVol };

                await AsyncStorage.setItem('music-vol', JSON.stringify(currentVol));
                await Audio.setAudioModeAsync(soundConfig);

                const isMuted = JSON.parse(await AsyncStorage.getItem('is-music-muted')) || false;
                setIsMuted(isMuted);
                setVolume(currentVol);
            } catch (error) {
                console.error('Error applying config:', error);
            }
        };
        applyConfig();
    }, []);

    useEffect(() => {
        const onPlaybackStatusUpdate = (playbackStatus) => {
            if (
                loadedMusic.length > 1 &&
                playbackStatus.didJustFinish &&
                !playbackStatus.isLooping
            ) {
                const musicListSize = loadedMusic.length;

                setPlayingMusic((prevPlayingMusic) => {
                    const nextPlayingMusic =
                        prevPlayingMusic === musicListSize - 1 ? 0 : prevPlayingMusic + 1;
                    playMusicList(nextPlayingMusic);
                    return nextPlayingMusic;
                });
            }
        };

        playback.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

        return () => {
            playback.setOnPlaybackStatusUpdate(null);
            playback.unloadAsync();
        };
    }, [loadedMusic, playback]);

    useEffect(() => {
        if (musicListLoaded && loadedMusic.length > 0) {
            playMusicList(0);
        }
    }, [musicListLoaded, loadedMusic]);

    useEffect(() => {
        if (loadedMusic.length) {
            playback.setVolumeAsync(isMuted ? 0 : volume).catch(error => console.error('Error setting volume:', error));
        }
    }, [isMuted, volume]);

    const playMusic = async (currentMusic, isLooping = false) => {
        try {
            await playback.unloadAsync();

            const newPlayback = new Audio.Sound();
            setPlayback(newPlayback);

            await newPlayback.loadAsync(currentMusic);
            await newPlayback.setVolumeAsync(isMuted ? 0 : volume);

            if (isLooping) {
                await newPlayback.setIsLoopingAsync(true);
            }

            await newPlayback.playAsync();
        } catch (error) {
            console.error('Error playing music:', error);
        }
    };

    const shouldDuckMusic = async (shouldDuck = false) => {
        const newVolume = shouldDuck ? 0.1 : 0.6;
        setVolume(newVolume);
    };

    const muteMusic = async (mute = false) => {
        try {
            await AsyncStorage.setItem('is-music-muted', JSON.stringify(mute));
            setIsMuted(mute);
        } catch (error) {
            console.error('Error muting music:', error);
        }
    };

    const loadMusicList = (...args) => {
        const musicsToLoad = [...args];
        setLoadedMusic(musicsToLoad);
        setMusicListLoaded(true);
    };

    const playMusicList = async (index = 0) => {
        if (!loadedMusic.length) {
            console.log('Please load the music list first');
            return;
        }

        try {
            await playback.unloadAsync();

            const newPlayback = new Audio.Sound();
            setPlayback(newPlayback);

            await newPlayback.loadAsync(loadedMusic[index]);
            await newPlayback.setVolumeAsync(isMuted ? 0 : volume);
            await newPlayback.playAsync();
            console.log('Playing music from list with volume:', isMuted ? 0 : volume);
        } catch (error) {
            console.error('Error playing music list:', error);
        }
    };

    const unloadMusic = async () => {
        try {
            playback.setOnPlaybackStatusUpdate(null);
            await playback.unloadAsync();

            setLoadedMusic([]);
            setMusicListLoaded(false);
            setPlayback(new Audio.Sound()); // Reset playback instance
        } catch (error) {
            console.error('Error unloading music:', error);
        }
    };

    return {
        music,
        isMuted,
        playMusic,
        shouldDuckMusic,
        muteMusic,
        loadMusicList,
        playMusicList,
        unloadMusic,
        musicListLoaded
    };
}
