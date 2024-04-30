import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: SIZES.large,
        paddingVertical: SIZES.large,
        paddingHorizontal: SIZES.medium,
        marginBottom: SIZES.medium
    },
    headerTitle: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        color: COLORS.textPrimary
    }
});

export default styles;
