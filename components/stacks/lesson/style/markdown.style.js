import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const headings = {
    fontFamily: FONT.MSExtraBold,
    color: COLORS.textTertiary
}

const styles = StyleSheet.create({
    body: {
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: SIZES.xLarge,
        gap: SIZES.medium
    },
    heading1: { ...headings, lineHeight: SIZES.xxLarge * 1.25 },
    heading2: headings,
    heading3: headings,
    heading4: headings,
    heading5: headings,
    heading6: headings,
    hr: {
        backgroundColor: COLORS.textSecondary + '40'
    },
    blockquote: {
        backgroundColor: COLORS.bgTertiary,
        borderColor: COLORS.primary,
        color: COLORS.textPrimary
    }
})

export default styles;
