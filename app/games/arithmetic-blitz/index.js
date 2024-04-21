import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Game() {
    useEffect(() => {
        router.replace('/games/arithmetic-blitz/game-lobby');
    }, []);
}
