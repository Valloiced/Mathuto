import { StyleSheet, Dimensions } from 'react-native';

import { BORDER_RADIUS, FONT, SIZES } from '../../../constants/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    drawerContainer: {
        height: height * 0.9,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginRight: SIZES.xxSmall
    },
    logoContainer: {
        alignSelf: 'center',
        width: '80%',
        aspectRatio: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SIZES.large
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    logoBg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain' // Ensure the logo fits within the ImageBackground
    },
    signOut: {
        marginHorizontal: SIZES.xSmall,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.small,
        borderWidth: 2,
        borderColor: '#B63D3D'
    },
    signOutWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.medium
    },
    signOutText: {
        fontFamily: FONT.MSExtraBold,
        letterSpacing: 1,
        color: '#B63D3D',
        fontSize: SIZES.small
    },
    signOutIcon: {
        fontSize: SIZES.medium,
        color: '#B63D3D'
    }
});

export default styles;
