import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: COLORS.bgTertiary,
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
        backgroundColor: COLORS.bgTertiary
    }
});

export default styles;
