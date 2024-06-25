import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, COLORS_RED } from '../../../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles = (theme = 'default') =>
    StyleSheet.create({
        gameLobbyContainer: {
            flex: 1,
            backgroundColor:
                theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + '80'
        },
        overlay: {
            position: 'absolute',
            width: width,
            height: height,
            top: 0,
            left: 0,
            backgroundColor: COLORS.textSecondary + '40'
        }
    });

export default styles;
