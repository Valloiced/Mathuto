import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import SubtopicHeader from './SubtopicHeader';
import SubtopicBody from './SubtopicBody';

import styles from './style/subtopicContainer.style';

export default function SubTopicCard({ topicId, lessons }) {
    const [activeCards, setActiveCards] = useState([]);

    const updateSections = (active) => {
        setActiveCards(active);
    };

    return (
        <View style={styles.subtopicContainer}>
            <Accordion
                containerStyle={styles.subtopicWrapper}
                sections={lessons}
                activeSections={activeCards}
                keyExtractor={(item) => item.subtopic}
                renderHeader={(section, key, isActive) => (
                    <SubtopicHeader key={key} section={section} isCollapsed={isActive} />
                )}
                renderContent={(section, key, isActive) => (
                    <SubtopicBody key={key} topicId={topicId} section={section} />
                )}
                onChange={updateSections}
                expandMultiple
                touchableComponent={TouchableOpacity}
            />
        </View>
    );
}
