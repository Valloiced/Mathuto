import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    formsContainer: {
        marginTop: SIZES.medium,
        flexDirection: 'column',
        gap: SIZES.xLarge
    },
    inputContainer: {
        flexDirection: 'column',
        gap: SIZES.xxLarge
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '90%',
        borderBottomColor: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        borderBottomWidth: 2,
        paddingVertical: SIZES.xxSmall,
        alignItems: 'center'
    },
    registerInput: {
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
    passwordIcon: {
        alignSelf: 'flex-end'
    },
    submitBtn: (isRegistering) => ({
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: (theme === 'default' ? COLORS.primary : COLORS_RED.primary) + (isRegistering ? '80' : ''),
        marginTop: SIZES.medium,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small
    }),
    submitBtnText: {
        color: '#FFF',
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    }
});

export default styles;
