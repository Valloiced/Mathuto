import React, { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import { ActivityIndicator, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import LearningMaterialsCard from './LearningMaterialsCard';

import styles from './style/learningMaterials.style';
import { COLORS } from '../../constants/theme';

export default function LearningMaterials() {
    const netinfo = useNetInfo();

    const [learningMaterials, setLearningMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER}/api/materials`);
            const topics = response.data.topics;

            setLearningMaterials(topics);
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
        }
    };

    useEffect(() => {
        if (netinfo.isConnected) {
            fetchMaterials();
        } else {
            // Netinfo would turn to null on dependency/network change and we need this line to prevent the message from showing up
            // due to useEffect behavior
            if (netinfo.isConnected !== false) {
                return;
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
    }, [netinfo]);

    const topicCards = learningMaterials.map((topic) => (
        <LearningMaterialsCard
            key={topic.id}
            topicId={topic.id}
            topicName={topic.name}
            itemCount={topic.noOfItems}
            creator={topic.creator}
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
