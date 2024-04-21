import { StyleSheet } from 'react-native';
import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SIZES
} from '../../../../constants/theme';

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderTopRightRadius: BORDER_RADIUS.medium * 1.2,
        borderTopLeftRadius: BORDER_RADIUS.medium * 1.2
    },
    paginationButton: {
        flexDirection: 'row',
        gap: SIZES.xSmall * 0.5,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium * 0.8
    },
    paginationBtnText: (disabled) => ({
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        color: !disabled ? COLORS.tertiary : COLORS.disabled
    })
});

export default styles;
