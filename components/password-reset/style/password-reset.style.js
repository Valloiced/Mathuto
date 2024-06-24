import { StyleSheet } from 'react-native';
import { SIZES, COLORS, COLORS_RED, FONT, BORDER_RADIUS } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    passwordResetContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: SIZES.xLarge
    },
    passwordResetHeader: {
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 2
    },
    description: {
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSLight,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        borderBottomWidth: 2,
        marginVertical: SIZES.xLarge,
        paddingVertical: SIZES.xxSmall,
        alignItems: 'center'
    },
    passwordResetInput: {
        flex: 1,
        fontFamily: FONT.MSRegular,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
    },
    iconWrapper: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.small
    },
    signupWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
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
        color: theme === 'default' ? COLORS.tertiary: COLORS_RED.tertiary,
        fontFamily: 'MontBold',
        fontSize: SIZES.small
    },
    submitBtn: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
        marginTop: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small
    },
    submitBtnText: {
        color: '#FFF',
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    }
});

export default styles;
