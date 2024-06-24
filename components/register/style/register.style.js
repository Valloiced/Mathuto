import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: SIZES.xLarge,
        gap: SIZES.large
    },
    registerHeader: {
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 3
    },
    altContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.large,
        marginTop: SIZES.medium
    },
    loginLink: {
        fontSize: SIZES.small,
        fontFamily: FONT.MSBold,
        letterSpacing: 1,
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
    },
    subtitle: {
        fontFamily: FONT.PopBold,
        letterSpacing: 2
    }
});

export default styles;
