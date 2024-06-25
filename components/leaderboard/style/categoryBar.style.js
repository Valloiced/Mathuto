import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, COLORS, COLORS_RED, FONT, SIZES } from '../../../constants/theme';

const styles = (theme = 'default') =>
    StyleSheet.create({
        leaderboardCategory: {
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: SIZES.medium,
            alignContent: 'stretch',
            justifyContent: 'space-between',
            backgroundColor: theme === 'default' ? COLORS.textTertiary : COLORS_RED.base,
            borderRadius: BORDER_RADIUS.xxLarge,
            overflow: 'hidden'
        },
        category: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: SIZES.xSmall,
            borderRadius: BORDER_RADIUS.xxLarge
        },
        categoryHeader: {
            fontFamily: FONT.MSMedium,
            fontSize: SIZES.small,
            color: COLORS.lightWhite
        },
        activeBar: (category, activeCategory) => ({
            width: '60%',
            height: 3,
            position: 'absolute',
            bottom: 0,
            backgroundColor: category === activeCategory ? COLORS.lightWhite : 'transparent'
        })
    });

export default styles;
