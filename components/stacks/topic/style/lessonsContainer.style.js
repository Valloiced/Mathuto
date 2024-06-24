import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    lessonContainer: {
        flex: 2,
        padding: SIZES.small,
        backgroundColor: COLORS.lightWhite
    },
    lessonCount: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        color: COLORS.textSecondary,
        marginBottom: SIZES.medium
    }
    // lessonItem: {
    //     flexDirection: 'row',
    //     gap: SIZES.large,
    //     width: '100%',
    //     paddingHorizontal: SIZES.large,
    //     paddingVertical: SIZES.small,
    //     backgroundColor: theme === 'default' ? COLORS.secondary : COLORS_RED.primaryLight,
    //     marginBottom: SIZES.small,
    //     borderRadius: BORDER_RADIUS.small
    // },
    // lessonNumber: {
    //     fontFamily: FONT.MSBold,
    //     fontSize: SIZES.medium,
    //     color: COLORS.textPrimary
    // },
    // lessonName: {
    //     width: '90%',
    //     fontFamily: FONT.MSMedium,
    //     fontSize: SIZES.medium,
    //     color: COLORS.textSecondary
    // }
});

export default styles;
