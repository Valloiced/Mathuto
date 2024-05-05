import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT, BORDER_RADIUS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: COLORS.textSecondary + '80'
    },
    modalContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        marginTop: 'auto',
        backgroundColor: COLORS.tertiary,
        borderTopLeftRadius: BORDER_RADIUS.large,
        borderTopRightRadius: BORDER_RADIUS.large
    },
    modalWrapper: {
        width: '80%',
        flexDirection: 'column'
    },
    modalHeader: {
        alignSelf: 'center',
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.large,
        letterSpacing: 1,
        marginBottom: SIZES.xxLarge,
        color: COLORS.white
    },
    difficultiesWrapper: {
        alignSelf: 'center',
        width: '90%',
        gap: SIZES.xSmall
    },
    difficultyButton: {
        paddingVertical: SIZES.small,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightWhite,
        borderRadius: BORDER_RADIUS.medium * 0.8
    },
    difficultyBtnText: {
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.large,
        letterSpacing: 2,
        color: COLORS.tertiary
    },
    modalNote: {
        alignSelf: 'center',
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.small,
        marginTop: SIZES.xLarge,
        color: COLORS.white
    }
});

export default styles;
