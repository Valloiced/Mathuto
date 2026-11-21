import { Dimensions, Platform } from 'react-native';

// On the web demo the app is shown in a phone-width frame (see app/_layout.js),
// so layouts that size themselves from the window must use the frame's width.
export const WEB_MAX_WIDTH = 480;

export const getWindow = () => {
    const window = Dimensions.get('window');
    return Platform.OS === 'web'
        ? { ...window, width: Math.min(window.width, WEB_MAX_WIDTH) }
        : window;
};
