import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCache = (key, initialValue = null) => {
    const [data, setData] = useState(initialValue);
    const [loadingCache, setLoadingCache] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cachedData = await AsyncStorage.getItem(key);
                if (cachedData !== null) {
                    setData(JSON.parse(cachedData));
                }
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            } finally {
                setLoadingCache(false);
            }
        };

        fetchData();
    }, [key]);

    const cacheData = async (value) => {
        try {
            await AsyncStorage.removeItem(key);
            await AsyncStorage.setItem(key, JSON.stringify(value));
            setData(value);
        } catch (error) {
            console.log('Error saving data to AsyncStorage:', error);
        }
    };

    const clearData = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setData(initialValue);
        } catch (error) {
            console.log('Error clearing data from AsyncStorage:', error);
        }
    };

    return { data, loadingCache, cacheData, clearData };
};

export default useCache;
