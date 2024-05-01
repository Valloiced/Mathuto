import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import sampleData from './test/sampleTopicData';
import SelectionCollapsedView from './SelectionCollapsedView';
import SelectionCard from './SelectionCard';

import styles from './style/SelectionContainer.style';

export default function SelectionContainer({
    materials,
    choosenTopics = [],
    setChoosenTopics
}) {
    const [activeCards, setActiveCards] = useState([]);

    const updateSections = (sectionToToggle) => {
        /** Multiple Select */
        // setActiveCards((prevSections) => {
        //     const newSections = [...prevSections];
        //     var index = newSections.indexOf(sectionToToggle);
        //     if (index !== -1) {
        //         newSections.splice(index, 1);
        //     } else {
        //         newSections.push(sectionToToggle);
        //     }
        //     return newSections;
        // });

        /** Single Select */
        setActiveCards((prevSections) => {
            let newSections = [...prevSections];
            var index = newSections.indexOf(sectionToToggle);
            if (index !== -1) {
                newSections.splice(index, 1);
            } else {
                newSections = [sectionToToggle];
            }
            return newSections;
        });
    };

    const handleSelect = (key) => {
        setChoosenTopics((prevSections) => {
            const newSections = [...prevSections];
            var index = newSections.indexOf(key);
            if (index !== -1) {
                newSections.splice(index, 1);
            } else {
                if (prevSections.length < 5) {
                    newSections.push(key);
                } else {
                    /** Player can only select 5 topics to play */
                    console.log('You can only choose five topics.');
                }
            }
            return newSections;
        });
    };

    return (
        <View style={styles.topicSelectionContainer}>
            <Accordion
                containerStyle={styles.selectionWrapper}
                sections={materials}
                activeSections={activeCards}
                keyExtractor={(item, i) => item.details.id}
                renderHeader={(section, key, isActive) => (
                    <SelectionCard
                        section={section}
                        isSelected={choosenTopics.indexOf(key) !== -1}
                        isCollapsed={isActive}
                        updateSections={() => updateSections(key)}
                        handleSelect={() => handleSelect(key)}
                    />
                )}
                renderContent={(section) => (
                    <SelectionCollapsedView section={section} />
                )}
                onChange={updateSections}
                touchableComponent={TouchableOpacity}
                disabled
            />
        </View>
    );
}
