import { StyleSheet } from 'react-native';
import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SIZES
} from '../../../../constants/theme';

const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 2,
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.xSmall,
        borderRadius: BORDER_RADIUS.medium,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xLarge,
        paddingRight: SIZES.xLarge
    },
    descriptionLabel: {
        fontFamily: FONT.MSExtraBold,
        letterSpacing: 1,
        fontSize: SIZES.medium,
        color: COLORS.textSecondary,
        marginBottom: SIZES.large
    },
    content: {
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: SIZES.xLarge
    }
});

export default styles;
