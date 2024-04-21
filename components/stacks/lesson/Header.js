import React from 'react';
import { Text, View } from 'react-native';

import styles from './style/header.style';

export default function Header({ lessonId, lessonName }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{lessonId}</Text>
            <Text style={styles.headerTitle}>{lessonName}</Text>
        </View>
    );
}
