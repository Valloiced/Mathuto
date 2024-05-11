import { StyleSheet, Dimensions } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    bannerContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: SIZES.xxSmall
    },
    quizTimeText: {
        alignSelf: 'center',
        fontFamily: FONT.MSBlack,
        fontSize: SIZES.xxLarge,
        color: COLORS.primary,
        letterSpacing: 1
    },
    bannerImgWrapper: {
        width: '100%',
        height: height * 0.25
    },
    bannerImg: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.small
    }
});

export default styles;
