import { StyleSheet } from 'react-native';

import { SIZES, FONT, BORDER_RADIUS } from '../../../constants/theme';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: SIZES.xxLarge
    },
    signOut: {
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
