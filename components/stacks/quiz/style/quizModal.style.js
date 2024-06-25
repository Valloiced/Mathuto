import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.textSecondary + '80' // 50% opacity
        },
        quizModalContainer: {
            width: '90%',
            paddingVertical: SIZES.xxLarge,
            paddingHorizontal: SIZES.medium,
            backgroundColor: COLORS.white,
            borderRadius: BORDER_RADIUS.medium
        },
        quizHeaderWrapper: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: SIZES.xxSmall
        },
        quizTitle: {
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            fontFamily: FONT.MSExtraBold,
            fontSize: SIZES.xLarge
        },
        quizQuestions: {
            color: COLORS.white,
            backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.xSmall,
            letterSpacing: 1,
            paddingVertical: SIZES.xxSmall * 0.25,
            paddingHorizontal: SIZES.xSmall,
            borderRadius: BORDER_RADIUS.medium
        },
        descriptionWrapper: {
            flexDirection: 'column',
            paddingVertical: SIZES.small,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.textSecondary + '40'
        },
        descriptionHeader: {
            color: COLORS.textSecondary,
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small
        },
        description: {
            color: COLORS.textSecondary + '80',
            fontFamily: FONT.PopRegular,
            fontSize: SIZES.small
        },
        currentContainer: {
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: SIZES.large,
            paddingVertical: SIZES.medium,
            paddingHorizontal: SIZES.xLarge,
            borderWidth: 1,
            borderColor: COLORS.textSecondary + '40',
            borderRadius: BORDER_RADIUS.small
        },
        currentHeaderWrapper: {
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            top: -SIZES.small,
            left: 0,
            right: 0
        },
        currentHeader: {
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingVertical: SIZES.xxSmall * 0.25,
            paddingHorizontal: SIZES.small,
            lineHeight: SIZES.medium,
            color: COLORS.white,
            backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small,
            borderWidth: 1,
            borderColor: (theme === 'default' ? COLORS.textTertiary : COLORS_RED.base) + '40',
            borderRadius: BORDER_RADIUS.medium
        },
        currentWrapper: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        currentLabel: {
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            fontFamily: FONT.PopRegular,
            fontSize: SIZES.small
        },
        currentDetail: {
            color: (theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark) + 'BF',
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.small
        },
        startBtn: {
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: SIZES.xSmall,
            backgroundColor: '#00C985',
            borderRadius: BORDER_RADIUS.small
        },
        startBtnWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: SIZES.small
        },
        startBtnIcon: {
            color: COLORS.white,
            fontSize: SIZES.medium
        },
        startBtnText: {
            color: COLORS.white,
            fontFamily: FONT.MSBold,
            fontSize: SIZES.medium
        },
        retakeIndicator: {
            width: '90%',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: SIZES.small,
            color: '#B63D3D' + 'BF',
            fontFamily: FONT.MSMedium,
            fontSize: SIZES.xSmall
        },
        exitBtn: {
            position: 'absolute',
            top: SIZES.small,
            right: SIZES.large
        },
        exitBtnText: {
            fontFamily: FONT.MSSemiBold,
            fontSize: SIZES.large
        }
    });

export default styles;
