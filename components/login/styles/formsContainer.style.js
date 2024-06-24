import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        gap: SIZES.medium,
        marginBottom: SIZES.xxSmall * 0.5
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        borderRadius: BORDER_RADIUS.small
    },
    loginInput: {
        flex: 1,
        marginRight: 0,
        alignSelf: 'flex-end',
        fontFamily: FONT.PopRegular,
        letterSpacing: 1,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.small,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.xSmall,
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary
    },
    icon: (dimensions) => ({
        width: dimensions,
        height: dimensions,
        margin: SIZES.xxLarge * 1.5
    }),
    loginIcon: {
        marginHorizontal: SIZES.medium
    },
    loginLink: {
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        alignSelf: 'flex-end',
        fontSize: SIZES.small
    },
    submitBtn: (isLoggingIn) => ({
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        opacity: isLoggingIn ? 0.5 : 1,
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        backgroundColor: COLORS.white,
        marginTop: SIZES.xSmall,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.xxSmall,
        borderRadius: BORDER_RADIUS.small
    }),
    submitBtnText: {
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 3
    }
});

export default styles;
