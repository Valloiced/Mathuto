import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    userRankCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: COLORS.textTertiary,
        paddingHorizontal: SIZES.medium
    },
    rank: {
        fontSize: SIZES.large,
        color: COLORS.white
    },
    ranker: {
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    points: {
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    status: {
        fontFamily: FONT.TorBold,
        color: COLORS.white,
        fontSize: SIZES.medium
    }
});

export default styles;
