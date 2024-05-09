import { StyleSheet } from 'react-native';
import { SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    subtopicContainer: {
        flex: 1
    },
    subtopicWrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: SIZES.xxSmall
    }
});

export default styles;
