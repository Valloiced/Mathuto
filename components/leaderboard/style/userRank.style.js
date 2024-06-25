import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        userRankCard: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: theme === 'default' ? COLORS.bgPrimary : COLORS_RED.tertiary,
            paddingHorizontal: SIZES.medium
        },
        rank: {
            fontSize: SIZES.large,
            color: COLORS.white
        },
        rankImgWrapper: {
            borderColor: COLORS.lightWhite
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
