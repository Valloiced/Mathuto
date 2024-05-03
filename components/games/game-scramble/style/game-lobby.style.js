import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerTitle: {
        color: COLORS.textPrimary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large
    },
    gameLobbyContainer: {
        backgroundColor: COLORS.bgSecondary
    },
    selectionContainer: {
        flexDirection: 'column',
        gap: SIZES.xSmall * -1,
        minHeight: height * 0.5,
        marginVertical: SIZES.medium
    },
    selectionIndicator: {
        marginHorizontal: SIZES.medium,
        color: COLORS.textSecondary + '80',
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    selectionLabelWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    topicsSelected: {
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.xSmall
    },
    topicsSelectedCount: {
        color: COLORS.textTertiary,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.large
    }
});

export default styles;
