import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = (theme = 'default') => StyleSheet.create({
    headerTitle: {
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.large
    },
    gameLobbyContainer: {
        backgroundColor: theme === 'default' ? COLORS.bgSecondary : COLORS_RED.white
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
        color: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.large
    }
});

export default styles;
