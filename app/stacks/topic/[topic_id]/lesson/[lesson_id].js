import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { ScrollView, ActivityIndicator } from 'react-native';
// import Toast from 'react-native-toast-message';

import useCache from '../../../../../hooks/useCache';

import styles from '../../../../../components/stacks/lesson/style/lesson.style';

import ReturnHeaderBtn from '../../../../../components/headers/ReturnHeaderBtn';
import Header from '../../../../../components/stacks/lesson/Header';
import LessonTabs from '../../../../../components/stacks/lesson/LessonTabs';
import Content from '../../../../../components/stacks/lesson/Content';
import PaginationButtons from '../../../../../components/stacks/lesson/PaginationButtons';

import { COLORS } from '../../../../../constants/theme';

export default function Lesson() {
    const { data, loadingCache } = useCache('topics', []);

    const params = useGlobalSearchParams();

    const [lesson, setLesson] = useState({
        name: '',
        content: {}
    });
    const [loading, setLoading] = useState(true);

    const [currentTab, setCurrentTab] = useState('summary');

    /** Using cached data for now */
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { topic_id, lesson_id } = params;
    //             const response = await axios.get(
    //                 `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topic_id}/lesson/${lesson_id}`
    //             );

    //             setLesson(response.data.lesson);
    //         } catch (error) {
    //             console.error('Unable to fetch lesson details:', error.message);
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Unable to load lesson details',
    //                 text2: error.message,
    //                 position: 'bottom',
    //                 autoHide: true,
    //                 visibilityTime: 5000
    //             });
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [params]);

    useEffect(() => {
        const updateData = () => {
            const { topic_id, lesson_id } = params;
            const cachedMaterial = data.find((material) => material.details?.id === topic_id);

            const cachedLesson = cachedMaterial.lessons.find(
                (lessonItem) => lessonItem.lessonNo === Number(lesson_id)
            );

            setLesson(cachedLesson);
            setLoading(false);
        };

        if (!loadingCache && !lesson.length) {
            updateData();
        }
    }, [params, data, loadingCache, lesson]);

    const trucateHeaderTitle =
        lesson.name.length > 20 ? lesson.name.slice(0, 20) + '...' : lesson.name;
    return (
        <>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: trucateHeaderTitle,
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitleAlign: 'center',
                    headerLeft: ReturnHeaderBtn
                }}
            />
            <ScrollView style={styles.lessonContainer}>
                <Header lessonId={params.lesson_id} lessonName={lesson.name} />
                <LessonTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" />
                ) : (
                    <Content content={lesson.content[currentTab]} currentTab={currentTab} />
                )}
            </ScrollView>
            <PaginationButtons topicId={params.topic_id} currentPage={params.lesson_id} />
        </>
    );
}
