import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    }
});

export default styles;
