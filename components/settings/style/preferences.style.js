import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from "../../../constants/theme";

const styles = (theme = 'default') => StyleSheet.create({
    preferenceWrapper: {
        flexDirection: 'row',
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    preferenceLabel: {
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.medium,
        color: COLORS.textSecondary + 'BF'
    },
    preferenceToggler: (isMuted) => ({
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.xxLarge * 2,
        height: SIZES.xxLarge,
        paddingHorizontal: SIZES.xxSmall * 0.5,
        backgroundColor: isMuted 
            ? 'transparent' 
            : (theme === 'default'
                ? COLORS.primary
                : COLORS_RED.primary
            ) + 40,
        borderWidth: 1,
        borderColor: isMuted 
            ? COLORS.textSecondary + '80' 
            : (theme === 'default'
                ? COLORS.primary
                : COLORS_RED.primary
            ),
        borderRadius: BORDER_RADIUS.xxLarge
    }),
    togglerKnob: (isMuted) => ({
        width: SIZES.xLarge,
        height: SIZES.xLarge,
        backgroundColor: isMuted 
            ? COLORS.textSecondary + '80' 
            : (theme === 'default'
                ? COLORS.primary
                : COLORS_RED.primary
            ),
        borderRadius: BORDER_RADIUS.xxLarge * 2
    }),
    withSeperator: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textSecondary + '40'
    }
});

export default styles;
