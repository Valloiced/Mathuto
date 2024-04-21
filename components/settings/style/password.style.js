import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    formWrapper: {
        marginBottom: SIZES.small,
        paddingTop: SIZES.small,
        paddingBottom: SIZES.medium,
        paddingHorizontal: SIZES.small,
        borderBottomWidth: 1,
        borderColor: COLORS.textSecondary + '40'
    },
    textInput: (fail) => ({
        borderWidth: fail ? 1 : 0,
        borderColor: fail ? '#B63D3D' : 'transparent'
    })
});

export default styles;
