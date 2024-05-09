import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../../../constants/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    detailsContainer: {
        position: 'relative',
        flex: 1
    },
    detailsBackground: {
        opacity: 0.7
    },
    itemGradient: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.large,
        paddingTop: SIZES.xxLarge * 4
    },
    detailsWrapper: {
        width: width * 0.8,
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
