import { StyleSheet, Dimensions } from 'react-native';
import { SIZES } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    topicSelectionContainer: (loading) => ({
        minHeight: height * 0.7,
        flexDirection: 'row',
        justifyContent: loading ? 'center' : '',
        alignItems: loading ? 'center' : '',
        paddingHorizontal: SIZES.medium
    }),
    selectionWrapper: {
        gap: SIZES.large,
        paddingVertical: SIZES.xLarge
    }
});

export default styles;
