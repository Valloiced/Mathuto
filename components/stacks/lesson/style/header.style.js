import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        headerContainer: {
            flex: 1,
            flexDirection: 'column',
            gap: SIZES.large,
            paddingVertical: SIZES.large,
            paddingHorizontal: SIZES.medium,
            marginBottom: SIZES.medium
        },
        headerTitle: {
            marginRight: SIZES.large,
            fontFamily: FONT.MSExtraBold,
            fontSize: SIZES.xxLarge,
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark
        }
    });

export default styles;
