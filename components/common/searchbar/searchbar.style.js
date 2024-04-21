import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    searchInputContainer: {
        backgroundColor: COLORS.bgTertiary
    },
    searchInput: {
        fontSize: SIZES.medium
    }
});

export default styles;
