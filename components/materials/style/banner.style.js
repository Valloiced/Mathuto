import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = (theme = 'default') =>
    StyleSheet.create({
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
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        },
        logoWrapper: {
            width: '100%',
            height: 125
        },
        logo: {
            width: '100%',
            height: '100%'
        }
    });

export default styles;
