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

    const soundConfig = {
        staysActiveInBackground: false,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: 0,
        playsInSilentModeIOS: true
    };

    const [loadedMusic, setLoadedMusic] = useState([]);
    const [playingMusic, setPlayingMusic] = useState(0);
    const [musicListLoaded, setMusicListLoaded] = useState(false);
    const [playback, setPlayback] = useState(new Audio.Sound());
    const [volume, setVolume] = useState(0.6); // Default

    // Apply Config
    useEffect(() => {
        const applyConfig = async () => await Audio.setAudioModeAsync(soundConfig);

        applyConfig();
    }, []);

    // For music list
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

    const playMusic = async (currentMusic, isLooping = false) => {
        try {
            await playback.unloadAsync();

            const newPlayback = new Audio.Sound();
            setPlayback(newPlayback);

            await newPlayback.loadAsync(currentMusic);
            await newPlayback.setVolumeAsync(volume);

            if (isLooping) {
                await newPlayback.setIsLoopingAsync(true);
            }

            await newPlayback.playAsync();
        } catch (error) {
            console.error('Error playing music:', error);
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
            await newPlayback.setVolumeAsync(volume);
            await newPlayback.playAsync();
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
        playMusic,
        loadMusicList,
        playMusicList,
        unloadMusic,
        musicListLoaded
    };
}
