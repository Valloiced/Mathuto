import { StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    socialIndicatorCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.medium,
        marginVertical: SIZES.small,
        paddingVertical: SIZES.xSmall,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '40'
    },
    socialLogo: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    socialProvider: {
        color: COLORS.textPrimary + 'BF',
        fontSize: SIZES.small,
        fontFamily: FONT.MSRegular
    }
});

export default styles;
