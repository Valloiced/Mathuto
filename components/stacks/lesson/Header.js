import React from 'react';
import { Text, View } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/header.style';

export default function Header({ lessonId, lessonName }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{lessonId}</Text>
            <Text style={styles.headerTitle}>{lessonName}</Text>
        </View>
    );
}
