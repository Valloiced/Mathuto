import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: (statusbarHeight) => ({
        position: 'absolute',
        width: width * 0.2,
        paddingHorizontal: SIZES.medium,
        top: statusbarHeight,
        justifyContent: 'flex-start'
    }),
    detailsContainer: {
        position: 'relative',
        flex: 1,
        height: height * 0.35
    },
    detailsBackground: {
        opacity: 0.6
    },
    itemGradient: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.large
    },
    detailsWrapper: {
        width: width * 0.5,
        alignSelf: 'flex-end',
        gap: SIZES.xLarge
    },
    topicTitle: {
        fontFamily: FONT.MSBold,
        fontSize: SIZES.xxLarge,
        color: COLORS.textPrimary
    },
    creator: {
        fontFamily: FONT.PopRegular,
        fontSize: SIZES.medium,
        color: COLORS.textSecondary
    }
});

export default styles;
