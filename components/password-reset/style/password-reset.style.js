import { StyleSheet } from 'react-native';

import { SIZES, COLORS, FONT, BORDER_RADIUS } from '../../../constants/theme';

const styles = StyleSheet.create({
    passwordResetContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: SIZES.xLarge
    },
    passwordResetHeader: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 2
    },
    description: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSLight,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    inputWrapper: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: COLORS.textPrimary,
        borderBottomWidth: 2,
        marginVertical: SIZES.xLarge,
        paddingVertical: SIZES.xxSmall,
        alignItems: 'center'
    },
    passwordResetInput: {
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
    signupWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: SIZES.small,
        gap: SIZES.xxSmall * 0.5
    },
    subtitle: {
        color: COLORS.tertiary,
        fontSize: SIZES.xSmall
    },
    highlight: {
        color: COLORS.tertiary,
        fontFamily: 'MontBold',
        fontSize: SIZES.small
    },
    submitBtn: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: COLORS.primary,
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
