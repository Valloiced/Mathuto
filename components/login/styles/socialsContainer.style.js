import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';
import { getTheme } from '../../../utils/theme.utils';

const theme = getTheme();

const styles = StyleSheet.create({
    socialsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small,
        marginTop: SIZES.xxSmall * 0.5
    },
    socialSubtitle: {
        color: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.small
    },
    socialOptions: {
        flexDirection: 'row',
        gap: SIZES.xLarge
    },
    socialIconWrapper: {
        backgroundColor: COLORS.white,
        padding: SIZES.xxSmall,
        borderRadius: BORDER_RADIUS.xxLarge
    },
    socialIcons: (dimensions) => ({
        width: dimensions,
        height: dimensions
    })
});

export default styles;
