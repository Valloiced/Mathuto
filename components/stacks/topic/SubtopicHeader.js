import React from 'react';
import { View, Text } from 'react-native';

import styles from './style/subtopicHeader.style';

import { ChevronDown } from '../../../assets/icons';

export default function SubtopicHeader({ section, isCollapsed }) {
    const formatLessonCount =
        section.lessons.length <= 1
            ? section.lessons.length + ' Lesson'
            : section.lessons.length + ' Lessons';
    return (
        <View style={styles.subtopicHeaderWrapper}>
            <ChevronDown style={styles.dropdownIcon(isCollapsed)} />
            <Text style={styles.subtopicHeader}>{section.subtopic}</Text>
            <Text style={styles.lessonCount}>{formatLessonCount}</Text>
        </View>
    );
}
