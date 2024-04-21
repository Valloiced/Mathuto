import { Dimensions, StyleSheet } from 'react-native';

import { SIZES, FONT, COLORS } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerContainer: {
        height: height * 0.35,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.large
    },
    headerImg: {
        width: 180,
        height: 180
    },
    headerTitle: {
        fontFamily: FONT.TorBold,
        fontSize: SIZES.xLarge,
        letterSpacing: 2,
        color: COLORS.textPrimary
    }
});

export default styles;
