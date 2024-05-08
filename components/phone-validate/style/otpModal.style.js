import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SIZES.small,
        paddingVertical: SIZES.xLarge,
        paddingHorizontal: SIZES.xxLarge,
        backgroundColor: COLORS.lightWhite
    },
    exitBtn: {
        position: 'absolute',
        top: SIZES.large,
        left: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.xxLarge * 1.25,
        height: SIZES.xxLarge * 1.25,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.large
    },
    exitBtnText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONT.MSBold
    },
    otpHeader: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 2,
        textAlign: 'center',
        marginHorizontal: SIZES.large
    },
    description: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSLight,
        fontSize: SIZES.small,
        letterSpacing: 1,
        textAlign: 'center',
        marginHorizontal: SIZES.medium
    },
    inputWrapper: {
        marginVertical: SIZES.xxLarge
    },
    textBoxWrapper: {
        flexDirection: 'row',
        gap: SIZES.small
    },
    textBox: (isFocused, isError) => ({
        width: 50,
        height: 70,
        flexDirection: 'row',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: FONT.MSBold,
        fontSize: SIZES.xLarge,
        color: COLORS.textTertiary,
        borderWidth: 1,
        borderColor: isError
        ? '#B63D3D'
        : isFocused
            ? COLORS.textSecondary  
            : COLORS.textSecondary + '40', 
        borderRadius: BORDER_RADIUS.small,
    }),
    hiddenInput: {
        position: 'absolute',
        top: -SIZES.xxLarge * 100 // get out
    },
    error: {
        marginVertical: SIZES.xxSmall,
        color: '#B63D3D',
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.xSmall
    },
    submitBtn: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small
    },
    submitBtnText: {
        color: '#FFF',
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 1
    },
    otpOptionsWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small,
        marginVertical: SIZES.medium
    },
    otpSubtitle: {
        color: COLORS.textSecondary,
        fontFamily: FONT.MSMedium,
        fontSize: SIZES.small
    },
    otpResend: {
        color: COLORS.tertiary,
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.small
    }
});

export default styles;