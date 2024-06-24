import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/lessonsContainer.style';

import SubtopicContainer from './SubtopicContainer';
import { COLORS } from '../../../constants/theme';

export default function LessonsContainer({ loading, topicId, lessonCount, lessons }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

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
