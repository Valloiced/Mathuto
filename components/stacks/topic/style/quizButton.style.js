import { Platform, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    gameButtonContainer: {
        // 'fixed' is not a React Native value: native keeps the bar in normal flow at the
        // bottom; on web it would pin to the browser window, so use 'absolute' instead.
        position: Platform.OS === 'web' ? 'absolute' : 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderTopRightRadius: BORDER_RADIUS.medium * 1.2,
        borderTopLeftRadius: BORDER_RADIUS.medium * 1.2
    },
    gameButton: {
        flexDirection: 'row',
        gap: SIZES.small,
        paddingHorizontal: SIZES.xxLarge * 2,
        paddingVertical: SIZES.xSmall,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium * 0.8
    },
    gameButtonText: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        color: COLORS.tertiary
    }
});

export default styles;
