import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    materialContainer: {
        flex: 1
    },
    materialContent: {
        flex: 1,
        paddingHorizontal: SIZES.medium,
        gap: SIZES.small
    }
});

export default styles;
