import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.textSecondary + '80' // 50% opacity
    },
    ytOfflineContainer: {
        width: '90%',
        flexDirection: 'column',
        paddingHorizontal: SIZES.xLarge,
        paddingVertical: SIZES.xxLarge,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xLarge,
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium
    },
    iconWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        color: COLORS.textPrimary,
        fontSize: 100
    },
    ytOfflineText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xSmall
    },
    offlineHeader: {
        color: COLORS.textPrimary,
        fontSize: SIZES.xLarge,
        fontFamily: FONT.MSExtraBold
    },
    offlineDescription: {
        color: COLORS.textPrimary + 'BF', // 75% opacity
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        textAlign: 'center'
    },
    navWrapper: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.large
    },
    retryBtn: {
        paddingVertical: SIZES.xxSmall * 0.5,
        paddingHorizontal: SIZES.xxLarge * 2,
        backgroundColor: COLORS.textTertiary,
        borderRadius: BORDER_RADIUS.large
    },
    retryBtnText: {
        color: COLORS.white,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.medium
    },
    goBackLinkText: {
        color: COLORS.textTertiary,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.medium
    }
});

export default styles;
