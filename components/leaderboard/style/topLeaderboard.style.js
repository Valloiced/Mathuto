import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    topLeaderboard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: height * 0.325,
        marginHorizontal: SIZES.medium
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
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: BORDER_RADIUS.medium,
        borderBottomLeftRadius: BORDER_RADIUS.medium
    },
    thirdRank: {
        width: '30%',
        paddingVertical: SIZES.xLarge * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderTopRightRadius: BORDER_RADIUS.medium,
        borderBottomRightRadius: BORDER_RADIUS.medium
    },
    rankDetails: {
        flexDirection: 'column',
        gap: SIZES.small
    },
    ranker: {
        fontSize: SIZES.medium,
        fontFamily: FONT.TorBold,
        color: COLORS.textPrimary
    },
    pointsWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    pointsLabel: {
        fontSize: SIZES.small,
        fontFamily: FONT.TorRegular,
        color: COLORS.textTertiary
    },
    points: (level) => ({
        // Top ranking will have larger font size
        fontSize: level === 'top' ? SIZES.large : SIZES.small,
        fontFamily: FONT.TorBold,
        color: COLORS.textPrimary
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
        borderWidth: 5,
        borderColor: borderColor ? borderColor : COLORS.bgPrimary
    }),
    rankImg: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        resizeMode: 'contain'
    }
});

export default styles;
