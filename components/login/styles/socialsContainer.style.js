import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    socialsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small,
        marginTop: SIZES.xxSmall * 0.5
    },
    socialSubtitle: {
        color: COLORS.tertiary,
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
