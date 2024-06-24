import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, SIZES, FONT } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
    },
    loginHeader: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        marginBottom: SIZES.xLarge,
        letterSpacing: 3
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
        paddingVertical: SIZES.medium
    },
    formsWrapper: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small
    },
    icon: (dimensions) => ({
        width: dimensions,
        height: dimensions,
        marginTop: SIZES.large
    }),
    signupWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: SIZES.small,
        gap: SIZES.xxSmall * 0.5
    },
    subtitle: {
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        fontSize: SIZES.xSmall
    },
    highlight: {
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        fontFamily: 'MontBold',
        fontSize: SIZES.small
    }
});

export default styles;
