import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    appInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.medium,
        marginTop: SIZES.xxLarge + SIZES.xxSmall,
        marginBottom: SIZES.small
    },
    logoContainer: {
        width: 90,
        height: 90
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    version: {
        fontSize: SIZES.medium,
        fontFamily: FONT.PopRegular,
        color: COLORS.textSecondary
    }
});

export default styles;
