import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    themeContainer: {
        flexDirection: 'column',
        gap: SIZES.small,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.medium
    },
    themeWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.small,
        marginLeft: SIZES.xxSmall
    },
    theme: (theme) => ({
        width: 30,
        height: 30,
        backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
        borderRadius: BORDER_RADIUS.xxLarge * 10
    }),
    changeTheme: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: SIZES.xxSmall * 0.5,
        paddingHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '80',
        borderRadius: BORDER_RADIUS.medium
    },
    changeThemeText: {
        color: COLORS.textSecondary,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.small
    }
});

export default styles;
