import { StyleSheet } from 'react-native';
import { GameTheme } from '../game/utils/theme.utils';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    gameContainer: (loading) => ({
        height: '100%',
        backgroundColor: loading ? COLORS.white : GameTheme.primaryBgColor
    })
});

export default styles;
