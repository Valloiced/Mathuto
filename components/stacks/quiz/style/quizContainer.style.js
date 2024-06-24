import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    quizContainer: {
        flexDirection: 'column',
        gap: SIZES.small,
        marginVertical: SIZES.medium
    },
    quizIndicator: {
        color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSSemiBold,
        fontSize: SIZES.small,
        letterSpacing: 1
    },
    quizWrapper: {
        flexDirection: 'column',
        gap: SIZES.large
    },
    quizCard: {
        flexDirection: 'column',
        gap: SIZES.xxSmall * 0.5,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.medium,
        paddingBottom: SIZES.xxLarge,
        backgroundColor: theme === 'default' ? COLORS.secondary : COLORS_RED.primaryLight,
        borderWidth: 1,
        borderColor: COLORS.textSecondary + '40',
        borderRadius: BORDER_RADIUS.small
    },
    quizCardTitle: {
        color:  theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.large,
        letterSpacing: 1
    },
    quizCardQuestions: {
        alignSelf: 'flex-start',
        color: COLORS.textSecondary,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.xSmall,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.xSmall,
        letterSpacing: 1,
        borderRadius: BORDER_RADIUS.medium
    },
    quizCardType: {
        position: 'absolute',
        bottom: SIZES.xxSmall,
        right: SIZES.xxSmall,
        color: COLORS.white,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.xSmall,
        backgroundColor: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
        paddingHorizontal: SIZES.xSmall,
        letterSpacing: 1,
        borderRadius: BORDER_RADIUS.medium
    },
    indicatorWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SIZES.xxLarge * 2
    },
    noQuizIndicator: {
        color: COLORS.textSecondary + 'BF',
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.medium
    }
});

export default styles;
