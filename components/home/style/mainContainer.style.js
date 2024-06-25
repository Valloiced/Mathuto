import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED } from '../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme === 'default' ? COLORS.bgSecondary : COLORS_RED.white + '80'
        }
    });

export default styles;
