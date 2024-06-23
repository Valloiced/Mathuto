import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import useCache from '../../hooks/useCache';
import useNetStatus from '../../hooks/useNetStatus';

import LearningMaterialsCard from './LearningMaterialsCard';

import styles from './style/learningMaterials.style';
import { COLORS } from '../../constants/theme';

export default function LearningMaterials() {
    const { data, cacheData } = useCache('materials', []);
    const { isConnected } = useNetStatus();

    const [learningMaterials, setLearningMaterials] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchMaterials = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER}/api/materials`);
            const topics = response.data.topics;

            setLearningMaterials(topics);
            cacheData(topics);
        } catch (error) {
            console.error('Unable to fetch materials');
            Toast.show({
                type: 'error',
                text1: 'Unable to load learning materials',
                text2: error.message,
                position: 'bottom',
                autoHide: true,
                visibilityTime: 5000
            });
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    }, [cacheData]);

    useEffect(() => {
        if (isConnected && loading && !isFetching) {
            fetchMaterials();
        } else if (!isConnected) {
            if (data) {
                setLearningMaterials(data);
            }

            Toast.show({
                type: 'error',
                text1: 'You are offline',
                text2: 'You need internet connection to load learning materials.',
                position: 'top',
                autoHide: true,
                visibilityTime: 5000
            });
        }
    }, [data, isFetching, loading, fetchMaterials, isConnected]);

    const topicCards = learningMaterials.map((topic) => (
        <LearningMaterialsCard
            key={topic.id}
            topicId={topic.id}
            topicName={topic.name}
            itemCount={topic.noOfItems}
            creator={topic.creator}
            version={topic.__v}
        />
    ));

    return (
        <View style={styles.learningMaterialsContainer}>
            <Text style={styles.learningMaterialsHeader}>Learning Materials</Text>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <View>{topicCards}</View>
            )}
        </View>
    );
}
