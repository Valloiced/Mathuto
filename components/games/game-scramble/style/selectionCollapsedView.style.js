import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    selectionCardCollapse: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: BORDER_RADIUS.small,
        borderBottomRightRadius: BORDER_RADIUS.small
    },
    collapsibleContainer: {
        position: 'relative',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        gap: SIZES.xSmall
    },
    collapsibleHeader: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.xSmall
    },
    termsContainer: {
        flexDirection: 'row',
        gap: SIZES.small
    },
    termsColumn: {
        flexDirection: 'column',
        gap: SIZES.xxSmall
    },
    termItem: {
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.xxSmall
    },
    termsIndicator: {
        position: 'absolute',
        bottom: SIZES.small,
        right: SIZES.medium,
        color: COLORS.textSecondary + '80',
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.xxSmall
    }
});

export default styles;
