import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    leaderboardModal: {
        flex: 1,
        minHeight: height * 0.5,
        marginTop: SIZES.xLarge,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.xxLarge * 2,
        borderTopLeftRadius: BORDER_RADIUS.large,
        borderTopRightRadius: BORDER_RADIUS.large,
        backgroundColor: COLORS.white
    },
    refreshNote: {
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small,
        color: COLORS.textTertiary,
        letterSpacing: 1,
        marginVertical: SIZES.small
    },
    statusText: {
        alignSelf: 'center',
        fontFamily: FONT.TorRegular,
        fontSize: SIZES.medium,
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginTop: SIZES.medium
    },
    leaderboardCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.large,
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textSecondary + '1A'
    },
    rank: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        color: COLORS.textSecondary + 'BF'
    },
    rankerWrapper: {
        flexDirection: 'row',
        gap: SIZES.small,
        alignItems: 'center'
    },
    rankerImgWrapper: {
        width: 40,
        height: 40,
        borderWidth: 3,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xxLarge,
        backgroundColor: COLORS.white
    },
    rankerImg: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS.xxLarge,
        resizeMode: 'contain'
    },
    ranker: {
        maxWidth: '70%',
        overflow: 'hidden',
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: COLORS.textTertiary
    },
    leaderboardCardWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    points: {
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small,
        color: COLORS.textSecondary + '80'
    }
});

export default styles;
