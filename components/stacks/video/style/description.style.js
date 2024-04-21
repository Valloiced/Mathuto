import { Dimensions, StyleSheet } from 'react-native';
import {
    BORDER_RADIUS,
    COLORS,
    FONT,
    SIZES
} from '../../../../constants/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    descriptionContainer: {
        flex: 1,
        marginTop: SIZES.large,
        backgroundColor: COLORS.lightWhite
    },
    edgeBg: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: SIZES.large,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        resizeMode: 'contain'
    },
    edgeBgImage: {
        width: width
    },
    descriptionHeader: {
        color: COLORS.white,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.small,
        letterSpacing: 1,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.medium
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: COLORS.primary + '40',
        paddingBottom: SIZES.xxLarge
    },
    description: {
        marginHorizontal: SIZES.medium,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.medium,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.xLarge
    },
    content: {
        color: COLORS.textPrimary,
        lineHeight: SIZES.large,
        fontFamily: SIZES.PopBold,
        fontSize: SIZES.small
    }
});

export default styles;
