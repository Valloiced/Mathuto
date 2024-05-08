import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    phoneValidateContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small,
        paddingVertical: SIZES.xLarge,
        paddingHorizontal: SIZES.xxLarge,
        backgroundColor: COLORS.lightWhite
    },
    phoneIcon: {
        color: COLORS.textPrimary,
        fontSize: SIZES.xxLarge * 4
    },
    phoneValidateHeader: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 2,
        textAlign: 'center',    
    },
    description: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSLight,
        fontSize: SIZES.small,
        letterSpacing: 1,
        textAlign: 'center',
        marginHorizontal: SIZES.small
    },
    inputContainer: {
        flexDirection: 'column',
        gap: SIZES.medium,
        alignItems: 'center',
        marginVertical: SIZES.xxLarge * 1.5,
    },
    inputHeader: {
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.medium
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: SIZES.medium,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.textSecondary + '80',
        borderRadius: BORDER_RADIUS.small
    },
    pickerContainer: {
        padding: SIZES.xxSmall,
        borderRightColor: COLORS.textPrimary,
        borderRightWidth: 1
    },
    phoneInput: {
        width: '70%',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        color: COLORS.textSecondary,
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.medium,
        letterSpacing: 1
    },
    error: {
        alignSelf: 'flex-start',
        color: '#B63D3D',
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.xSmall
    },
    submitBtn: (processing) => ({
        opacity: processing ? 0.75 : 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#FFF',
        backgroundColor: COLORS.primary,
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

export default styles