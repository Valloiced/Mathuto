import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../../../../components/stacks/lesson/style/lesson.style';

import ReturnHeaderBtn from '../../../../../components/headers/ReturnHeaderBtn';
import Header from '../../../../../components/stacks/lesson/Header';
import LessonTabs from '../../../../../components/stacks/lesson/LessonTabs';
import Content from '../../../../../components/stacks/lesson/Content';
import PaginationButtons from '../../../../../components/stacks/lesson/PaginationButtons';

import { COLORS } from '../../../../../constants/theme';

export default function Lesson() {
    const params = useGlobalSearchParams();

    const [lesson, setLesson] = useState({
        name: '',
        content: {}
    });
    const [loading, setLoading] = useState(true);

    const [currentTab, setCurrentTab] = useState('summary');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { topic_id, lesson_id } = params;
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topic_id}/lesson/${lesson_id}`
                );

                setLesson(response.data.lesson);
            } catch (error) {
                console.error('Unable to fetch lesson details:', error.message);
                Toast.show({
                    type: 'error',
                    text1: 'Unable to load lesson details',
                    text2: error.message,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    return (
        <>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: lesson.name,
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitleAlign: 'center',
                    headerLeft: ReturnHeaderBtn
                }}
            />
            <ScrollView style={styles.lessonContainer}>
                <Header lessonId={params.lesson_id} lessonName={lesson.name} />
                <LessonTabs
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" />
                ) : (
                    <Content
                        content={lesson.content[currentTab]}
                        currentTab={currentTab}
                    />
                )}
            </ScrollView>
            <PaginationButtons
                topicId={params.topic_id}
                currentPage={params.lesson_id}
            />
        </>
    );
}
