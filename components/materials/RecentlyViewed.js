import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import useCache from '../../hooks/useCache';

import styles from './style/recentlyViewed.style';

import RecentlyViewedCard from './RecentlyViewedCard';

export default function RecentlyViewed() {
    const { data } = useCache('recent-topics', []);

    const recentlyViewedCards = data.map((recentTopic) => (
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
            {data.length > 0 ? (
                <ScrollView horizontal>{recentlyViewedCards}</ScrollView>
            ) : (
                <Text style={styles.status}>No Recent Topics Viewed Yet</Text>
            )}
        </View>
    );
}
