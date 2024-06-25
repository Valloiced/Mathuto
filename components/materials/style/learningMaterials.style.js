import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        learningMaterialsContainer: {
            flex: 1,
            gap: SIZES.xSmall
        },
        learningMaterialsHeader: {
            fontFamily: FONT.MSBold,
            marginVertical: SIZES.small,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        },
        learningMaterialsItem: {
            flex: 1,
            width: '100%',
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
            paddingVertical: SIZES.large,
            paddingHorizontal: SIZES.xxLarge,
            borderRadius: BORDER_RADIUS.medium,
            borderWidth: 1,
            borderColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary
        },
        detailsWrapper: {
            marginBottom: SIZES.xLarge
        },
        materialTitle: {
            fontFamily: FONT.MSExtraBold,
            fontSize: SIZES.large,
            textTransform: 'uppercase',
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            marginBottom: SIZES.xxSmall * 0.2 * -1 // Minimize margin
        },
        materialCount: {
            fontFamily: FONT.MSMedium,
            fontSize: SIZES.small
        },
        creatorWrapper: {
            flexDirection: 'row',
            gap: SIZES.medium,
            alignItems: 'center'
        },
        creatorIcon: (dimensions) => ({
            width: dimensions,
            height: dimensions
        }),
        imageContainer: {
            borderRadius: BORDER_RADIUS.xxLarge * 2,
            padding: 5,
            backgroundColor: '#FFF',
            borderColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            borderWidth: 1
        },
        creator: {
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small
        }
    });

export default styles;
