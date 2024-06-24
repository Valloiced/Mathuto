import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    subtopicHeaderWrapper: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.small,
        paddingBottom: SIZES.xLarge,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '1A',
        borderBottomWidth: 1.5
    },
    subtopicHeader: {
        width: '80%',
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.medium
    },
    dropdownIcon: (isCollapsed) => ({
        transform: [{ rotate: isCollapsed ? '0deg' : '-90deg' }],
        fontSize: SIZES.medium,
        marginRight: SIZES.medium,
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
    }),
    lessonCount: {
        position: 'absolute',
        right: SIZES.small,
        bottom: SIZES.xxSmall,
        color: theme === 'default' ? COLORS.textPrimary + 'BF' : COLORS_RED.dark + 'BF',
        fontFamily: FONT.MSMedium,
        fontSize: SIZES.small
    }
});

export default styles;
