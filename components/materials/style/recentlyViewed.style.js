import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';
const { width } = Dimensions.get('window');

const styles = (theme = 'default') =>
    StyleSheet.create({
        recentlyViewedContainer: {
            flex: 1,
            gap: SIZES.xSmall
        },
        recentlyViewedHeader: {
            fontFamily: FONT.MSBold,
            marginVertical: SIZES.small,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        },
        recentlyViewedItem: {
            flex: 1,
            width: width * 0.8,
            resizeMode: 'contain',
            marginRight: SIZES.medium,
            marginBottom: SIZES.large,
            overflow: 'visible'
        },
        itemBackground: {
            opacity: 0.6,
            borderRadius: BORDER_RADIUS.medium
        },
        itemGradient: {
            flex: 1,
            width: '100%',
            height: '100%',
            paddingTop: SIZES.large,
            paddingBottom: SIZES.medium,
            paddingHorizontal: SIZES.xxLarge,
            borderRadius: BORDER_RADIUS.medium,
            borderWidth: 1,
            borderColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary
        },
        detailsWrapper: {
            marginBottom: SIZES.medium
        },
        materialTitle: {
            fontFamily: FONT.MSExtraBold,
            textTransform: 'uppercase',
            fontSize: SIZES.large,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            marginBottom: SIZES.xxSmall * 0.5 * -1 // Minimize margin
        },
        materialCount: {
            fontFamily: FONT.MSMedium,
            fontSize: SIZES.small
        },
        creator: {
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small
        },
        status: {
            fontSize: SIZES.small,
            fontFamily: FONT.PopRegular,
            textAlign: 'center',
            color: COLORS.textSecondary
        }
    });

export default styles;
