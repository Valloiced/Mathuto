import { StyleSheet } from 'react-native';
import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SIZES
} from '../../../../constants/theme';

const styles = StyleSheet.create({
    gameButtonContainer: {
        position: 'fixed',
        bottom: 0,
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
        paddingHorizontal: SIZES.xxLarge * 1.5,
        paddingVertical: SIZES.xSmall * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium * 0.8
    },
    plusIcon: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.xLarge,
        color: COLORS.tertiary
    },
    gameButtonText: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        color: COLORS.tertiary
    }
});

export default styles;
