import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    subtopicHeaderWrapper: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '1A',
        borderBottomWidth: 1.5
    },
    subtopicHeader: {
        width: '80%',
        color: COLORS.textPrimary,
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.medium
    },
    dropdownIcon: (isCollapsed) => ({
        transform: [{ rotate: isCollapsed ? '0deg' : '-90deg' }],
        fontSize: SIZES.medium,
        marginRight: SIZES.medium,
        color: COLORS.textTertiary
    }),
    lessonCount: {
        position: 'absolute',
        right: SIZES.small,
        bottom: SIZES.xxSmall,
        color: COLORS.textPrimary + 'BF',
        fontFamily: FONT.MSMedium,
        fontSize: SIZES.small
    }
});

export default styles;
