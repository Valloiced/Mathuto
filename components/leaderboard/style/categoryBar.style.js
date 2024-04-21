import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
    leaderboardCategory: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: SIZES.medium,
        alignContent: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: COLORS.textTertiary,
        borderRadius: BORDER_RADIUS.xxLarge,
        overflow: 'hidden'
    },
    category: (category, activeCategory) => ({
        flex: 1,
        alignItems: 'center',
        paddingVertical: SIZES.small,
        borderRadius: BORDER_RADIUS.xxLarge,
        backgroundColor:
            category === activeCategory
                ? COLORS.secondary + '80'
                : 'transparent'
        // borderBottomWidth: 3,
        // borderBottomColor:
        //     category === activeCategory
        //         ? COLORS.secondary
        //         : 'transparent'
    }),
    categoryHeader: {
        fontFamily: FONT.MSMedium,
        fontSize: SIZES.medium,
        // fontSize: SIZES.small,
        color: COLORS.lightWhite
    }
});

export default styles;
