import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useTheme(initialTheme = 'default') {
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const themeData = await AsyncStorage.getItem('theme');
                if (themeData !== null) {
                    setTheme(JSON.parse(themeData));
                }
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            }
        };

        fetchTheme();
    }, []);

    const changeTheme = async (newTheme) => {
        try {
            await AsyncStorage.removeItem('theme');
            await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
            setTheme(newTheme);
        } catch (error) {
            console.log('Error saving data to AsyncStorage:', error);
        }
    };

    return [theme, changeTheme];
}
