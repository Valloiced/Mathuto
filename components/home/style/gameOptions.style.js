import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    optionsContainer: {
        flex: 1,
        padding: SIZES.medium,
        paddingBottom: SIZES.xxLarge * 2 // Temp
    },
    optionsWrapper: {
        width: '100%',
        marginBottom: SIZES.xxLarge
    },
    categoryHeader: {
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        marginBottom: SIZES.xSmall
    },
    gameWrapper: {
        flexDirection: 'column',
        gap: SIZES.small
    },
    gameOption: {
        width: '100%',
        paddingVertical: SIZES.medium,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
        borderRadius: BORDER_RADIUS.small
    },
    gameOptionBg: {
        borderRadius: BORDER_RADIUS.small
    },
    gameOptionTitle: {
        marginLeft: SIZES.medium,
        fontFamily: FONT.TorBold,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontSize: SIZES.large,
        letterSpacing: 1
    }
});

export default styles;
