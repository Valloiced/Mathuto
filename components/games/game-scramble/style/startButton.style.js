import { StyleSheet } from 'react-native';

import { COLORS, SIZES, FONT, BORDER_RADIUS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.xSmall,
        backgroundColor: COLORS.tertiary,
        borderTopRightRadius: BORDER_RADIUS.medium * 1.2,
        borderTopLeftRadius: BORDER_RADIUS.medium * 1.2
    },
    startButton: {
        width: '70%',
        flexDirection: 'row',
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium * 0.8
    },
    startBtnText: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.medium,
        letterSpacing: 2,
        color: COLORS.tertiary
    }
});

export default styles;
