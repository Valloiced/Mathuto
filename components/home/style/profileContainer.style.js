import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        height: height * 0.3,
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
    }
});

export default styles;
