import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        profileContainer: {
            width: '100%',
            paddingVertical: SIZES.xxSmall,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:
                theme === 'default' ? COLORS.bgTertiary : COLORS_RED.primaryLight + 'BF',
            gap: SIZES.large
        },
        profileWrapper: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: SIZES.medium
        },
        profileImg: (dimensions) => ({
            width: dimensions,
            height: dimensions,
            borderRadius: BORDER_RADIUS.xxLarge * 2,
            resizeMode: 'contain'
        }),
        profileHeader: {
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            fontFamily: FONT.MSExtraBold,
            fontSize: SIZES.large,
            flexWrap: 'wrap',
            letterSpacing: 1
        },
        imageContainer: {
            borderRadius: BORDER_RADIUS.xxLarge * 2,
            padding: 4,
            backgroundColor: '#FFF',
            borderColor: theme === 'default' ? COLORS.primary : COLORS_RED.primary,
            borderWidth: 5,
            overflow: 'hidden'
        },
        profileDescription: {
            fontFamily: FONT.MSMedium
        },
        offlineView: {
            gap: SIZES.small
        },
        signInToSync: {
            color: theme === 'default' ? COLORS.textPrimary : COLORS_RED.dark,
            fontFamily: FONT.MSBold,
            fontSize: SIZES.small
        },
        signInBtn: {
            paddingHorizontal: SIZES.xxLarge * 2,
            paddingVertical: SIZES.xxSmall * 0.5,
            backgroundColor: theme === 'default' ? COLORS.tertiary : COLORS_RED.tertiary,
            borderRadius: BORDER_RADIUS.medium
        },
        signInBtnText: {
            color: COLORS.lightWhite,
            fontFamily: FONT.PopSemiBold,
            fontSize: SIZES.medium
        }
    });

export default styles;
