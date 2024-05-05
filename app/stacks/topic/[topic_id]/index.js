import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from '../../../../components/stacks/topic/style/topic.style';
import DetailsContainer from '../../../../components/stacks/topic/DetailsContainer';
import LessonsContainer from '../../../../components/stacks/topic/LessonsContainer';
import GameButton from '../../../../components/stacks/topic/GameButton';

export default function Topics() {
    const params = useGlobalSearchParams();
    const [topicDetails, setTopicDetails] = useState({
        name: '',
        creator: ''
    });
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { topic_id } = params;

                // TODO: OPTIMIZATION
                // - Other than retrieving the lessons one by one which is both expensive and frustating
                //   at the user-end due to longer wait time, it is better to also include the the corresponding
                //   lessons at api fetch to avoid wait time.
                // - It's gonna be large in terms of size, however we can optimize by only fetching the lessons
                //   that are on-screen.
                // - If that doesn't work, think of other ways to optimize this vicente
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topic_id}`
                );

                setTopicDetails(response.data.details);
                setLessons(response.data.lessons);
            } catch (error) {
                console.error('Unable to fetch material details:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Unable to load material details',
                    text2: error.message,
                    position: 'bottom',
                    autoHide: true,
                    visibilityTime: 5000
                });
            } finally {
                setLoading(false);
            }
        };

        if (params) {
            fetchData();
        }
    }, [params]);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerShown: false,
                    headerShadowVisible: false
                }}
            />
            <ScrollView style={styles.topicContainer}>
                <DetailsContainer name={topicDetails.name} creator={topicDetails.creator} />
                <LessonsContainer
                    loading={loading}
                    topicId={params.topic_id}
                    lessonCount={topicDetails.noOfItems}
                    lessons={lessons}
                />
            </ScrollView>
            <GameButton />
        </>
    );
}
