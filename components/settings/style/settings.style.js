import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: SIZES.xxLarge * 0.2,
        paddingHorizontal: SIZES.medium,
        backgroundColor: COLORS.white
    },
    settingsSection: {
        flex: 1,
        flexDirection: 'column',
        gap: SIZES.xxSmall,
        marginVertical: SIZES.xxLarge
    },
    settingsHeader: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        color: COLORS.textPrimary
    },
    settingsWrapper: {
        flex: 1,
        borderRadius: BORDER_RADIUS.large,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '40'
    },
    formWrapper: {
        marginHorizontal: SIZES.small,
        paddingBottom: SIZES.medium
    },
    textInputWrapper: {
        flexDirection: 'column',
        marginVertical: SIZES.xxSmall,
        gap: SIZES.xxSmall * 0.5
    },
    textLabel: {
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.small,
        color: COLORS.textSecondary + 'BF'
    },
    textInput: {
        flex: 1,
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.large,
        borderRadius: BORDER_RADIUS.small,
        backgroundColor: COLORS.textPrimary + '0D'
    },
    submitContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderTopWidth: 1,
        borderColor: COLORS.textSecondary + '40'
    },
    submitButton: (isBeingUpdated) => ({
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.large,
        backgroundColor: COLORS.textTertiary + (isBeingUpdated ? 'BF' : '80'),
        borderRadius: BORDER_RADIUS.medium
    }),
    submitLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xSmall
    },
    submitBtnText: {
        fontSize: SIZES.small,
        fontFamily: FONT.PopSemiBold,
        color: COLORS.white
    },
    submitBtnIcon: {
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    formIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.xSmall,
        marginHorizontal: SIZES.small
    },
    formIndicatorLabel: (isSubmitting) => ({
        fontSize: SIZES.small,
        fontFamily: FONT.PopRegular,
        color: isSubmitting ? COLORS.textPrimary : '#1C9336'
    }),
    loginRequired: {
        color: '#B63D3D'
    },
    successMarkWrapper: {
        padding: SIZES.xxSmall,
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        borderWidth: 1,
        borderColor: '#1C9336'
    },
    successMark: {
        fontSize: SIZES.large,
        color: '#1C9336'
    }
});

export default styles;
