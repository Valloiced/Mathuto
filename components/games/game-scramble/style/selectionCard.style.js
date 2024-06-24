import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    selectionCard: (isSelected, isCollapsed) => ({
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme === 'default' ? COLORS.secondary  + 'BF' : COLORS_RED.primaryLight,
        paddingHorizontal: SIZES.xLarge,
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small,
        borderBottomLeftRadius: !isCollapsed ? BORDER_RADIUS.small : 0,
        borderBottomRightRadius: !isCollapsed ? BORDER_RADIUS.small : 0,
        borderWidth: 3,
        borderColor: isSelected 
            ? (theme === 'default' 
                ? COLORS.primary 
                : COLORS_RED.primary) 
            : COLORS.white
    }),
    selectionTitle: {
        fontFamily: FONT.TorBold,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontSize: SIZES.large,
        textTransform: 'capitalize'
    },
    selectionItemCount: {
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.textPrimary
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
