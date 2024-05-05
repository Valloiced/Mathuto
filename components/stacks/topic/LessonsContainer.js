import React from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './style/lessonsContainer.style';
import { COLORS, SHADOWS } from '../../../constants/theme';

function LessonCard({ topicId, lessonNumber, lessonName }) {
    /** Local Storage-based, however, make it database-based later */
    const addToRecentView = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-lessons');
            const recentLessons = JSON.parse(response);

            const dataToAdd = {
                topicId: topicId,
                id: lessonNumber,
                name: lessonName
            };

            // If no recent views have made up yet
            if (!recentLessons) {
                await AsyncStorage.setItem('recent-lessons', JSON.stringify([dataToAdd]));
                return;
            }

            const checkIfExists = recentLessons.findIndex(
                (lessonItem) => lessonItem.id === lessonNumber && lessonItem.topicId === topicId
            );

            // If item already exists, move it to the start
            if (checkIfExists !== -1) {
                const temp = recentLessons[checkIfExists];
                recentLessons.splice(checkIfExists, 1);
                recentLessons.unshift(temp);
            } else {
                // Recent Viewed items are limited to 100 items. This act as a queue which removes the end of the limit and append the new one
                if (recentLessons.length === 100) {
                    recentLessons.pop();
                    recentLessons.unshift(dataToAdd);
                } else {
                    // If it is still not limited, just append the data;
                    recentLessons.unshift(dataToAdd);
                }
            }

            // Clear the storage first
            await AsyncStorage.removeItem('recent-lessons');

            // Reset the updated item
            await AsyncStorage.setItem('recent-lessons', JSON.stringify(recentLessons));

            return;
        } catch (error) {
            console.error('Failed to save in recent views.');
            /* Does not need to show error */
        }
    };

    const handlePress = async () => {
        await addToRecentView();

        router.push(`/stacks/topic/${topicId}/lesson/${lessonNumber}`);
    };

    return (
        <TouchableOpacity style={[styles.lessonItem, SHADOWS.small]} onPress={handlePress}>
            <Text style={styles.lessonNumber}>{lessonNumber}</Text>
            <Text style={styles.lessonName}>{lessonName}</Text>
        </TouchableOpacity>
    );
}

export default function LessonsContainer({ loading, topicId, lessonCount, lessons }) {
    const lessonCards = lessons.map((lesson) => (
        <LessonCard
            key={lesson.id}
            topicId={topicId}
            lessonNumber={lesson.lessonNo}
            lessonName={lesson.name}
        />
    ));

    return (
        <View style={styles.lessonContainer}>
            <Text
                style={styles.lessonCount}
            >{`${lessonCount || 0} ${lessonCount > 1 ? 'Lessons' : 'Lesson'}`}</Text>
            {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
            ) : (
                <View>{lessonCards}</View>
            )}
        </View>
    );
}
