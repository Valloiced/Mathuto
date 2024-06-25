import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles = (theme = 'default') =>
    StyleSheet.create({
        ytMaterialContainer: {
            width: '100%',
            marginTop: SIZES.large,
            flexDirection: 'column',
            gap: SIZES.medium
        },
        ytHeaderWrapper: {
            backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            alignSelf: 'flex-start',
            paddingHorizontal: SIZES.medium,
            paddingVertical: SIZES.xSmall,
            borderRadius: BORDER_RADIUS.xxLarge
        },
        ytHeader: {
            fontSize: SIZES.medium,
            fontFamily: FONT.MSExtraBold,
            color: COLORS.lightWhite,
            letterSpacing: 1
        },
        ytMaterialCard: {
            width: width * 0.9,
            backgroundColor: COLORS.lightWhite,
            flexDirection: 'column',
            marginRight: SIZES.large,
            borderTopLeftRadius: BORDER_RADIUS.xLarge,
            borderTopRightRadius: BORDER_RADIUS.xLarge,
            borderBottomLeftRadius: BORDER_RADIUS.medium,
            borderBottomRightRadius: BORDER_RADIUS.medium,
            borderWidth: 2,
            borderColor: theme === 'default' ? COLORS.textPrimary + '40' : COLORS_RED.dark + '40' // 25% opacity
        },
        ytMaterialThumbnail: {
            width: '100%',
            height: height * 0.25,
            resizeMode: 'contain'
        },
        ytMaterialImg: {
            borderRadius: BORDER_RADIUS.xLarge - 2, // borderTop - borderWidth of the parent container
            borderWidth: 1,
            borderColor: COLORS.textSecondary + '40'
        },
        ytMaterialDetails: {
            width: '100%',
            flexDirection: 'row',
            gap: SIZES.small,
            paddingVertical: SIZES.small,
            paddingHorizontal: SIZES.small
        },
        imgContainer: {
            width: 40,
            height: 40,
            flexDirection: 'row',
            borderRadius: BORDER_RADIUS.xxLarge * 2,
            borderWidth: 2,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.white
        },
        ytCreatorImg: {
            width: '100%',
            height: '100%',
            borderRadius: BORDER_RADIUS.xxLarge * 2
        },
        ytDetailsWrapper: {
            width: '85%',
            flexDirection: 'column',
            gap: SIZES.medium
        },
        ytMaterialTitle: {
            fontSize: SIZES.medium,
            fontFamily: FONT.PopBold,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            lineHeight: SIZES.large
        },
        ytInfoWrapper: {
            flexDirection: 'row',
            gap: SIZES.xxSmall,
            flexWrap: 'wrap'
        },
        ytInfo: {
            fontSize: SIZES.small,
            fontFamily: FONT.PopRegular,
            color: COLORS.textSecondary
        }
    });

export default styles;
