import { Dimensions, StyleSheet } from 'react-native';
import { SIZES, FONT, COLORS, COLORS_RED } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = (theme = 'default') => StyleSheet.create({
    headerContainer: {
        height: height * 0.35,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.large
    },
    headerImg: {
        width: 180,
        height: 180
    },
    headerTitle: {
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge,
        letterSpacing: 2,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
    }
});

export default styles;
