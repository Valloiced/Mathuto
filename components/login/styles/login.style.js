import { StyleSheet } from 'react-native';

import { COLORS, SIZES, FONT } from '../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgTertiary
    },
    loginHeader: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.xxLarge,
        color: '#1E2142',
        marginBottom: SIZES.xLarge,
        letterSpacing: 3
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.bgTertiary,
        paddingVertical: SIZES.medium
    },
    formsWrapper: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SIZES.small
    },
    icon: (dimensions) => ({
        width: dimensions,
        height: dimensions,
        margin: SIZES.xxLarge * 1.5
    }),
    signupWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: SIZES.small,
        gap: SIZES.xxSmall * 0.5
    },
    subtitle: {
        color: COLORS.tertiary,
        fontSize: SIZES.xSmall
    },
    highlight: {
        color: COLORS.tertiary,
        fontFamily: 'MontBold',
        fontSize: SIZES.small
    }
});

export default styles;
