import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: SIZES.xLarge,
        gap: SIZES.large
    },
    registerHeader: {
        color: COLORS.textPrimary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 3
    },
    altContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.large,
        marginTop: SIZES.medium
    },
    loginLink: {
        fontSize: SIZES.small,
        fontFamily: FONT.MSBold,
        letterSpacing: 1,
        color: COLORS.tertiary
    },
    subtitle: {
        fontFamily: FONT.PopBold,
        letterSpacing: 2
    }
});

export default styles;
