import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        offlineCardContainer: {
            flex: 1,
            flexDirection: 'row',
            gap: SIZES.large,
            marginVertical: SIZES.small,
            marginHorizontal: SIZES.medium,
            backgroundColor: COLORS.white,
            paddingVertical: SIZES.large,
            paddingHorizontal: SIZES.xLarge,
            paddingRight: SIZES.medium,
            borderWidth: 1,
            borderColor: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
            borderRadius: BORDER_RADIUS.medium
        },
        offlineIcon: {
            color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
            fontSize: SIZES.xxLarge * 1.5
        },
        offlineWrapper: {
            flex: 1,
            flexDirection: 'column',
            gap: SIZES.medium
        },
        cardHeader: {
            color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
            fontFamily: FONT.MSExtraBold,
            fontSize: SIZES.medium,
            textTransform: 'uppercase'
        },
        cardDetails: {
            color: COLORS.textSecondary + '80',
            fontFamily: FONT.MSSemiBold,
            fontSize: SIZES.xSmall,
            lineHeight: SIZES.medium
        }
    });

export default styles;
