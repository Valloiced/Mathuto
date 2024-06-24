import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, COLORS_RED } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles =(theme = 'default') => StyleSheet.create({
    banner: {
        width: '100%',
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme === 'default' ? COLORS.primary :  COLORS_RED.primaryLight
    },
    bannerImgWrapper: {
        width: '90%'
    },
    bannerImg: {
        width: '100%',
        height: '100%'
    }
});

export default styles;
