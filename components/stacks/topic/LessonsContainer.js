import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './style/lessonsContainer.style';
import SubtopicContainer from './SubtopicContainer';
import { COLORS } from '../../../constants/theme';

export default function LessonsContainer({ loading, topicId, lessonCount, lessons }) {
    return (
        <View style={styles.lessonContainer}>
            <Text
                style={styles.lessonCount}
            >{`${lessonCount || 0} ${lessonCount > 1 ? 'Lessons' : 'Lesson'}`}</Text>
            {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
            ) : (
                <SubtopicContainer topicId={topicId} lessons={lessons} />
            )}
        </View>
    );
}
