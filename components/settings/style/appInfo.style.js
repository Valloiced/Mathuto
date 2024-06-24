import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    appInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.medium,
        marginBottom: SIZES.small
    },
    logoContainer: {
        width: 200,
        height: 200
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    version: {
        fontSize: SIZES.medium,
        fontFamily: FONT.PopRegular,
        color: COLORS.textSecondary,
        marginTop: -SIZES.xxLarge * 1.75
    }
});

export default styles;
