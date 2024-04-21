import { StyleSheet } from 'react-native';

import { BORDER_RADIUS, COLORS, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZES.small
    },
    avatarWrapper: {
        position: 'relative',
        width: 110,
        height: 110,
        borderRadius: BORDER_RADIUS.xxLarge + 10, // Half the width and height
        backgroundColor: COLORS.white,
        borderWidth: 5,
        borderColor: COLORS.primary
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS.xxLarge,
        resizeMode: 'contain'
    },
    iconWrapper: {
        position: 'absolute',
        bottom: SIZES.xSmall * -1,
        right: SIZES.xSmall * -1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderRadius: BORDER_RADIUS.xxLarge
    },
    icon: {
        fontSize: 20,
        color: COLORS.textPrimary
    }
});

export default styles;
