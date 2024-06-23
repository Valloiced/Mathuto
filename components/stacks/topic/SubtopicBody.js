import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import useCache from '../../../hooks/useCache';

import styles from './style/subtopicBody.style';

function LessonCard({ topicId, lessonId, lessonNo, lessonName }) {
    /** Cache-based, however, make it database-based later */
    const { data, cacheData } = useCache('recent-lessons', []);

    const addToRecentView = async () => {
        try {
            const recentLessons = data;

            const dataToAdd = {
                topicId: topicId,
                id: lessonId,
                name: lessonName
            };

            // If no recent views have made up yet
            if (!recentLessons) {
                cacheData([dataToAdd]);
                return;
            }

            const checkIfExists = recentLessons.findIndex(
                (lessonItem) => lessonItem.id === lessonId && lessonItem.topicId === topicId
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

            cacheData(recentLessons);
        } catch (error) {
            console.error('Failed to save in recent views.');
            /* Does not need to show error */
        }
    };

    const handlePress = async () => {
        await addToRecentView();

        router.push(`/stacks/topic/${topicId}/lesson/${lessonNo}`);
    };

    return (
        <TouchableOpacity style={styles.lessonItem} onPress={handlePress}>
            <Text style={styles.lessonNumber}>{lessonNo}</Text>
            <Text style={styles.lessonName}>{lessonName}</Text>
        </TouchableOpacity>
    );
}

export default function SubtopicBody({ topicId, section }) {
    const lessonCard = section.lessons.map((lesson, index) => {
        const { id, name, lessonNo } = lesson;

        return <LessonCard 
            key={id} 
            topicId={topicId} 
            lessonId={id} 
            lessonNo={lessonNo}
            lessonName={name} 
        />;
    });

    return <View style={styles.subtopicBodyWrapper}>{lessonCard}</View>;
}
