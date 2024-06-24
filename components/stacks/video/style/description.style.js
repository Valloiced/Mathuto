import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';
import { getTheme } from '../../../../utils/theme.utils';

const theme = getTheme();

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
        backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
        borderRadius: BORDER_RADIUS.medium
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: theme === 'default' ? COLORS.primary + '40' : COLORS_RED.primary + '40',
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
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        lineHeight: SIZES.large,
        fontFamily: SIZES.PopBold,
        fontSize: SIZES.small
    }
});

export default styles;
