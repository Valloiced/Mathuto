import { Dimensions, StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    videoPlayerContainer: {
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
        backgroundColor: COLORS.lightWhite
    },
    blob1Wrapper: {
        position: 'absolute',
        top: SIZES.medium,
        left: SIZES.small * -1,
        width: '100%',
        height: '60%'
    },
    blob2Wrapper: {
        position: 'absolute',
        bottom: SIZES.xxLarge * 2,
        right: SIZES.xxLarge * 8 * -1,
        width: '100%',
        height: '40%'
    },
    blob: {
        flex: 1,
        resizeMode: 'contain'
    },
    playerContainer: {
        marginHorizontal: SIZES.xSmall,
        marginTop: SIZES.xxLarge * 3,
        borderRadius: BORDER_RADIUS.small,
        width: width - SIZES.xSmall * 2,
        height: height * 0.3,
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.textPrimary + '40',
        overflow: 'hidden'
    },
    videoPlayer: {
        flex: 1,
        borderRadius: BORDER_RADIUS.small
    },
    videoPlayerInfo: {
        width: '100%',
        paddingHorizontal: SIZES.medium,
        marginTop: SIZES.small
    },
    videoMainDetails: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    videoTitle: {
        color: COLORS.textTertiary,
        fontFamily: FONT.PopBold,
        letterSpacing: 1,
        fontSize: SIZES.large
    },
    mainDetailsWrapper: {
        flexDirection: 'row',
        gap: SIZES.medium
    },
    mainDetails: {
        color: COLORS.textPrimary,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.small
    },
    infoContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: SIZES.small,
        paddingVertical: SIZES.small,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    channel: {
        flexDirection: 'row',
        gap: SIZES.small,
        alignItems: 'center'
    },
    channelImgWrapper: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    channelImg: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS.xxLarge * 2,
        resizeMode: 'contain'
    },
    channelName: {
        width: width * 0.4,
        lineHeight: SIZES.large,
        color: COLORS.textPrimary,
        fontFamily: FONT.PopBold,
        fontSize: SIZES.medium,
        overflow: 'hidden'
    },
    redirectButton: {
        flexDirection: 'row',
        gap: SIZES.xSmall,
        alignItems: 'center',
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.large,
        backgroundColor: '#B63D3D',
        borderRadius: BORDER_RADIUS.medium
    },
    redirectBtnText: {
        color: COLORS.white,
        fontFamily: FONT.TorBold,
        fontSize: SIZES.small
    },
    ytIcon: {
        color: COLORS.white,
        fontSize: SIZES.medium
    }
});

export default styles;
