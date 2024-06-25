import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const headings = (theme) => ({
    fontFamily: FONT.MSExtraBold,
    color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
});

const styles = (theme = 'default') =>
    StyleSheet.create({
        body: {
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small,
            textAlign: 'left',
            lineHeight: SIZES.xLarge,
            gap: SIZES.medium
        },
        heading1: { ...headings, lineHeight: SIZES.xxLarge * 1.25 },
        heading2: headings(theme),
        heading3: headings(theme),
        heading4: headings(theme),
        heading5: headings(theme),
        heading6: headings(theme),
        hr: {
            backgroundColor: COLORS.textSecondary + '40'
        },
        blockquote: {
            backgroundColor:
                theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
            borderColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
        }
    });

export default styles;
