import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        paddingVertical: SIZES.xxSmall,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.bgTertiary,
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
        color: '#1E2142',
        fontFamily: FONT.MSExtraBold,
        fontSize: SIZES.large,
        flexWrap: 'wrap',
        letterSpacing: 1
    },
    imageContainer: {
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        padding: 4,
        backgroundColor: '#FFF',
        borderColor: '#48B2FF',
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
        color: COLORS.textPrimary,
        fontFamily: FONT.MSBold,
        fontSize: SIZES.small
    },
    signInBtn: {
        paddingHorizontal: SIZES.xxLarge * 2,
        paddingVertical: SIZES.xxSmall * 0.5,
        backgroundColor: COLORS.tertiary,
        borderRadius: BORDER_RADIUS.medium
    },
    signInBtnText: {
        color: COLORS.lightWhite,
        fontFamily: FONT.PopSemiBold,
        fontSize: SIZES.small
    }
});

export default styles;
