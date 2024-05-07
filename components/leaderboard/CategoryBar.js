import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style/categoryBar.style';

export default function CategoryBar({ currentCategory, setCurrentCategory }) {
    return (
        <View style={styles.leaderboardCategory}>
            <TouchableOpacity
                style={styles.category}
                onPress={() => setCurrentCategory('daily-scores')}
            >
                <Text style={styles.categoryHeader}>Daily</Text>
                <View style={styles.activeBar('daily-scores', currentCategory)} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.category}
                onPress={() => setCurrentCategory('weekly-scores')}
            >
                <Text style={styles.categoryHeader}>Weekly</Text>
                <View style={styles.activeBar('weekly-scores', currentCategory)} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => setCurrentCategory('overall')}>
                <Text style={styles.categoryHeader}>All Time</Text>
                <View style={styles.activeBar('overall', currentCategory)} />
            </TouchableOpacity>
        </View>
    );
}
