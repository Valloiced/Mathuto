import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTheme = async () => {
    const defaultTheme = 'default';

    try {
        const themeData = await AsyncStorage.getItem('theme');
        if (themeData !== null) {
            return await JSON.parse(themeData)
        } else {
            return defaultTheme;
        }
    } catch (error) {
        console.log('Error fetching theme: ', error.message);
        return defaultTheme;
    }
}

export const getThemeTest = async () => {
    return new Promise((resolve, reject) => {
        resolve(AsyncStorage.getItem('theme'));
        reject()
    })
}

console.log(getThemeTest());
  

export const changeTheme = async (newTheme) => {
    try {
        await AsyncStorage.removeItem('theme');
        await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (error) {
        console.log('Error saving data to AsyncStorage:', error);
    }
}