import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
    headerTitle: {
        color: COLORS.textPrimary,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large
    },
    gameLobbyContainer: {
        backgroundColor: COLORS.bgSecondary
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
