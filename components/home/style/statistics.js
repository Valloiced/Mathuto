import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    statistics: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.medium,
        paddingVertical: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.textPrimary + '40' // 25% opacity
    },
    statisticsWrapper: {
        width: '48%',
        gap: SIZES.xSmall,
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS.medium,
        borderWidth: 1,
        borderColor: COLORS.textPrimary + '40', // 25% opacity
        backgroundColor: COLORS.white,
        padding: SIZES.xxSmall
    },
    statisticsIcon: (dimension) => ({
        width: dimension,
        height: dimension
    }),
    row: {
        width: width * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statisticsLabel: {
        color: COLORS.textSecondary,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.xSmall
    },
    statisticsValue: {
        color: COLORS.textSecondary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium
    }
});

export default styles;
