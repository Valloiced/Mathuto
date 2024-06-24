import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    headerStyle: {
        backgroundColor: theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
        gap: SIZES.medium
    },
    headerTitleStyle: {
        fontFamily: FONT.MSBold,
        letterSpacing: 1,
        color: COLORS.textSecondary,
        fontSize: SIZES.medium
    },
    lessonContainer: {
        flex: 1,
        backgroundColor: theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
    }
});

export default styles;
