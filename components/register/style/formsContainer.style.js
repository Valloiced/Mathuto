import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

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
        borderBottomColor: COLORS.textPrimary,
        borderBottomWidth: 2,
        paddingVertical: SIZES.xxSmall,
        alignItems: 'center'
    },
    registerInput: {
        flex: 1,
        fontFamily: FONT.MSRegular,
        color: COLORS.textPrimary
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
        backgroundColor: isRegistering ? COLORS.primary + '80' : COLORS.primary,
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
