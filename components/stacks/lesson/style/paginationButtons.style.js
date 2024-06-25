import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        paginationContainer: {
            flexDirection: 'row',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: SIZES.xSmall,
            backgroundColor: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
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
            color: !disabled
                ? theme === 'default'
                    ? COLORS.tertiary
                    : COLORS_RED.tertiary
                : theme === 'default'
                  ? COLORS.disabled
                  : COLORS_RED.disabled
        })
    });

export default styles;
