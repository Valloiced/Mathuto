import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style/categoryBar.style';

export default function CategoryBar({ currentCategory, setCurrentCategory }) {
    return (
        <View style={styles.leaderboardCategory}>
            <TouchableOpacity
                style={styles.category('daily-scores', currentCategory)}
                onPress={() => setCurrentCategory('daily-scores')}
            >
                <Text style={styles.categoryHeader}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.category('weekly-scores', currentCategory)}
                onPress={() => setCurrentCategory('weekly-scores')}
            >
                <Text style={styles.categoryHeader}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.category('overall', currentCategory)}
                onPress={() => setCurrentCategory('overall')}
            >
                <Text style={styles.categoryHeader}>All Time</Text>
            </TouchableOpacity>
        </View>
    );
}
