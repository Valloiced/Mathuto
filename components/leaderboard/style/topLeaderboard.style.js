import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = (theme = 'default') => StyleSheet.create({
    topLeaderboard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: height * 0.325,
        marginHorizontal: SIZES.xSmall
    },
    firstRank: {
        width: '40%',
        paddingVertical: SIZES.xLarge * 1.5,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: BORDER_RADIUS.medium,
        borderTopRightRadius: BORDER_RADIUS.medium
    },
    secondRank: {
        position: 'relative',
        width: '30%',
        paddingVertical: SIZES.xLarge * 1.2,
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.secondary : COLORS_RED.white,
        borderTopLeftRadius: BORDER_RADIUS.medium,
        borderBottomLeftRadius: BORDER_RADIUS.medium
    },
    thirdRank: {
        width: '30%',
        paddingVertical: SIZES.xLarge * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.secondary : COLORS_RED.white,
        borderTopRightRadius: BORDER_RADIUS.medium,
        borderBottomRightRadius: BORDER_RADIUS.medium
    },
    rankDetails: {
        marginTop: SIZES.xxSmall,
        flexDirection: 'column',
        gap: SIZES.small
    },
    ranker: {
        fontSize: SIZES.small,
        fontFamily: FONT.TorBold,
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        textAlign: 'center'
    },
    pointsWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    pointsLabel: {
        fontSize: SIZES.small,
        fontFamily: FONT.TorRegular,
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
    },
    points: (level) => ({
        // Top ranking will have larger font size
        fontSize: level === 'top' ? SIZES.large : SIZES.small,
        fontFamily: FONT.TorBold,
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base
    }),
    rankImgWrapper: (size, borderColor) => ({
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: size * -0.75,
        width: size,
        height: size,
        backgroundColor: COLORS.white,
        borderRadius: size / 2,
        borderWidth: 4,
        borderColor: borderColor ? borderColor : COLORS.bgPrimary
    }),
    rankIndicator: (color, isTop) => ({
        position: 'absolute',
        bottom: 30 * -0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: SIZES.large,
        width: isTop ? 30 : 25,
        height: isTop ? 30 : 25
    }),
    rank: (color, isTop) => ({
        color: color,
        fontSize: isTop ? SIZES.large : SIZES.medium,
        fontFamily: FONT.TorBold
    }),
    rankImg: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        resizeMode: 'contain'
    }
});

export default styles;
