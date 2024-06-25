import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
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
            backgroundColor: isActive
                ? theme === 'default'
                    ? COLORS.textTertiary
                    : COLORS_RED.base
                : COLORS.white,
            borderRadius: BORDER_RADIUS.medium,
            borderWidth: 1,
            borderColor: COLORS.textSecondary + '40'
        }),
        lessonTabText: (isActive) => ({
            color: isActive
                ? COLORS.white
                : theme === 'default'
                  ? COLORS.textPrimary + 'BF'
                  : COLORS_RED.dark + 'BF',
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small,
            letterSpacing: 1
        })
    });

export default styles;
