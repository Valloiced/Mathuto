import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameLobbyContainer: {
        flex: 1,
        backgroundColor: COLORS.bgTertiary
    },
    overlay: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
        backgroundColor: COLORS.textSecondary + '40'
    }
});

export default styles;
