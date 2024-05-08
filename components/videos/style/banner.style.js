import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    banner: {
        flex: 1,
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    bannerHeader: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        letterSpacing: 2,
        color: COLORS.white,
        textAlign: 'center'
    }
});

export default styles;
