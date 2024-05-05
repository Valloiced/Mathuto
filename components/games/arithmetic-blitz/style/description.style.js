import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 1
    },
    descriptionWrapper: {
        flex: 1,
        gap: SIZES.large,
        padding: SIZES.xLarge,
        marginVertical: SIZES.xLarge,
        marginHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xLarge
    },
    description: {
        flexDirection: 'column',
        gap: SIZES.xSmall
    },
    header: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 2,
        color: COLORS.textTertiary
    },
    content: {
        color: COLORS.textSecondary + 'BF', // 75% opacity
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        letterSpacing: 1,
        lineHeight: SIZES.large
    }
});

export default styles;
