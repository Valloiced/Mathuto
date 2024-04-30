import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textSecondary + '80' // 50% opacity
    },
    dialogContainer: {
        width: '90%',
        flexDirection: 'column',
        gap: SIZES.xxLarge,
        paddingHorizontal: SIZES.xxLarge,
        paddingVertical: SIZES.xLarge * 1.25,
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium
    },
    dialogText: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xxSmall * 0.5
    },
    dialogHeader: {
        color: COLORS.textTertiary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xLarge
    },
    dialogDescription: {
        width: '100%',
        color: COLORS.textSecondary + 'BF', // 75% opacity
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        textAlign: 'center'
    },
    confirmationWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xxSmall
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.large,
        borderWidth: 1,
        borderColor: COLORS.textTertiary
    },
    cancelBtnText: {
        color: COLORS.textTertiary,
        fontSize: SIZES.small,
        fontFamily: FONT.PopBold
    },
    confirmButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        backgroundColor: COLORS.textTertiary,
        borderRadius: BORDER_RADIUS.large,
        borderWidth: 1,
        borderColor: COLORS.bgTertiary
    },
    confirmBtnText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONT.PopBold
    }
});

export default styles;
