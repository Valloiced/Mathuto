import { useEffect, useState } from 'react';
import { addEventListener } from '@react-native-community/netinfo';

export default function useNetStatus() {
    const [isConnected, setIsConnected] = useState(true);
    const [netType, setNetType] = useState(null);

    useEffect(() => {
        const unsubscribe = addEventListener((state) => {
            setIsConnected(state.isConnected);
            setNetType(state.type);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected, netType };
}
