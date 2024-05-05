import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import useNetStatus from '../../../../hooks/useNetStatus';
import useCache from '../../../../hooks/useCache';

import DetailsContainer from '../../../../components/stacks/topic/DetailsContainer';
import LessonsContainer from '../../../../components/stacks/topic/LessonsContainer';
import GameButton from '../../../../components/stacks/topic/GameButton';

import styles from '../../../../components/stacks/topic/style/topic.style';

export default function Topics() {
    const params = useGlobalSearchParams();
    const { isConnected } = useNetStatus();

    /** Cache data upon topic stack view, if there is no cached data,
     *  fetch the data in an external API, however, if a user goes
     *  offline without retrieving the cached data, just show an offline message
     */
    const { data, loadingCache, cacheData } = useCache('topics', []);

    const [topicDetails, setTopicDetails] = useState({
        name: '',
        creator: ''
    });
    const [lessons, setLessons] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const { topic_id } = params;

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topic_id}`
            );

            setIsUpdated(true);
            setTopicDetails(response.data.details);
            setLessons(response.data.lessons);

            const newCache = () => {
                let createNewCache = [...data];

                const topics = createNewCache.map((topic) => topic.details.id);
                const index = topics.indexOf(response.data.details.id);

                // If a cache already exists, replace it with new one (for validateCache)
                if (index !== -1) {
                    createNewCache.splice(index, 1);
                }

                createNewCache = [response.data, ...createNewCache];

                return createNewCache;
            };

            cacheData(newCache());
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
    }, [params, data, cacheData]);

    const validateCache = useCallback(
        async (cache) => {
            try {
                // If there is a network connection, we could check the version of the
                // cache in the background and if the cache is outdated, update it silently
                if (isConnected) {
                    const versionRes = await axios.get(
                        `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${cache.details.id}/version`
                    );

                    const { version } = versionRes.data;

                    if (cache.details?.__v !== version) {
                        console.log('Updating cache...');
                        // Refetch data
                        fetchData();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        [fetchData, isConnected]
    );

    /** On mount */
    useEffect(() => {
        const updateData = async () => {
            const { topic_id } = params;
            const cachedMaterial = data.find(
                (material) => material.details?.id === topic_id
            );

            // If there's a cached material, proceed using the cache
            if (cachedMaterial && !loadingCache) {
                setTopicDetails(cachedMaterial.details);
                setLessons(cachedMaterial.lessons);
                setLoading(false);
                setIsUpdated(true);
                validateCache(cachedMaterial);
            } else if (!cachedMaterial && !loadingCache) {
                // Else fetch the necessary data
                await fetchData();
            }
        };

        if (!isUpdated && !lessons.length) {
            updateData();
        }
    }, [
        params,
        lessons,
        loadingCache,
        validateCache,
        isUpdated,
        data,
        fetchData
    ]);

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
