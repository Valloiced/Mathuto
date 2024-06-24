import { StyleSheet } from 'react-native';
import { COLORS, COLORS_RED } from '../../../constants/theme';

const styles = (theme = 'default') => StyleSheet.create({
    leaderboardContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: theme === 'default' ? COLORS.primary : COLORS_RED.primaryLight
    }
});

export default styles;
