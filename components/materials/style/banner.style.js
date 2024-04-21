import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    banner: {
        flex: 1,
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        resizeMode: 'contain'
    },
    bannerImg: {
        opacity: 0.6
    },
    bannerHeader: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.medium,
        letterSpacing: 1,
        color: COLORS.textPrimary
    }
});

export default styles;
