import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import styles from './style/recentlyViewed.style';

import { COLORS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecentlyViewedCard from './RecentlyViewedCard';

export default function RecentlyViewed() {
    const [recentTopics, setRecentTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AsyncStorage.getItem('recent-topics');
                const topics = JSON.parse(response);

                if (topics) {
                    setRecentTopics(topics);
                }
            } catch (error) {
                console.error('Error fetching recent data:', error.message);
                /* Does not need to show error */
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const recentlyViewedCards = recentTopics.map((recentTopic) => (
        <RecentlyViewedCard
            key={recentTopic.id}
            id={recentTopic.id}
            topicName={recentTopic.name}
            itemCount={recentTopic.noOfItems}
            creator={recentTopic.creator}
        />
    ));

    return (
        <View style={styles.recentlyViewedContainer}>
            <Text style={styles.recentlyViewedHeader}>Recently Viewed</Text>
            {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
            ) : recentTopics.length > 0 ? (
                <ScrollView horizontal>{recentlyViewedCards}</ScrollView>
            ) : (
                <Text style={styles.status}>No Recent Topics Viewed Yet</Text>
            )}
        </View>
    );
}
