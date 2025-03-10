import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    lessonTabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.small,
        columnGap: SIZES.xxSmall,
        marginVertical: SIZES.large
    },
    lessonTab: (isActive) => ({
        alignItems: 'center',
        paddingVertical: SIZES.xxSmall,
        paddingHorizontal: SIZES.large,
        backgroundColor: isActive ? COLORS.textTertiary : COLORS.white,
        borderRadius: BORDER_RADIUS.medium,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '40'
    }),
    lessonTabText: (isActive) => ({
        color: isActive ? COLORS.white : COLORS.textPrimary + 'BF',
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        letterSpacing: 1
    })
});

export default styles;
