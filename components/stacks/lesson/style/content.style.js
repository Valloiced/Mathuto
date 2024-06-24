import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
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
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
    },
    link: {
        marginLeft: SIZES.large,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.xSmall
    },
    linkStatus: {
        alignSelf: 'center',
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
    }
});

export default styles;
