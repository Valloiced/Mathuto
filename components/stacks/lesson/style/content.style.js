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
    },
    linkCardContainer: {
        flexDirection: 'column',
        gap: SIZES.large,
        paddingVertical: SIZES.medium
    },
    linkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.small
    },
    icon: {
        fontSize: SIZES.xLarge,
        color: COLORS.textTertiary
    },
    link: {
        marginLeft: SIZES.large,
        color: COLORS.textPrimary,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.xSmall
    },
    linkStatus: {
        alignSelf: 'center',
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: COLORS.textPrimary
    }
});

export default styles;
