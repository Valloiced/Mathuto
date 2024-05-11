import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    selectionCard: (isSelected, isCollapsed) => ({
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.secondary + 'BF',
        paddingHorizontal: SIZES.xLarge,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small,
        borderBottomLeftRadius: !isCollapsed ? BORDER_RADIUS.small : 0,
        borderBottomRightRadius: !isCollapsed ? BORDER_RADIUS.small : 0,
        borderWidth: 3,
        borderColor: isSelected ? COLORS.primary : COLORS.white
    }),
    selectionTitle: {
        fontFamily: FONT.TorBold,
        color: COLORS.textPrimary,
        fontSize: SIZES.large,
        textTransform: 'capitalize'
    },
    selectionItemCount: {
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: COLORS.textPrimary
    },
    chevronWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    chevron: {
        fontSize: SIZES.large
    }
});

export default styles;
