import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, SIZES, FONT } from '../../../../constants/theme';

const styles = StyleSheet.create({
    offlineViewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.small
    },
    viewHeader: {
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    goBackBtn: {
        paddingVertical: SIZES.xxSmall * 0.5,
        paddingHorizontal: SIZES.xxLarge,
        backgroundColor: COLORS.textTertiary,
        borderRadius: BORDER_RADIUS.large
    },
    goBackBtnText: {
        color: COLORS.white,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.small
    }
});

export default styles;
