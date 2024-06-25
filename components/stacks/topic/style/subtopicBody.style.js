import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        subtopicBodyWrapper: {
            flexDirection: 'column',
            backgroundColor: COLORS.lightWhite
        },
        lessonItem: {
            flexDirection: 'row',
            gap: SIZES.large,
            width: '100%',
            paddingHorizontal: SIZES.large,
            paddingVertical: SIZES.small,
            paddingLeft: SIZES.xLarge,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: COLORS.textSecondary + '1A'
        },
        lessonNumber: {
            fontFamily: FONT.MSSemiBold,
            fontSize: SIZES.medium,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        },
        lessonName: {
            width: '90%',
            fontFamily: FONT.PopRegular,
            fontSize: SIZES.medium,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        }
    });

export default styles;
