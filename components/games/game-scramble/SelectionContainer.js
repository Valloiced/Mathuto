import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Toast from 'react-native-toast-message';

import SelectionCollapsedView from './SelectionCollapsedView';
import SelectionCard from './SelectionCard';

import styles from './style/selectionContainer.style';
import { COLORS } from '../../../constants/theme';

export default function SelectionContainer({
    loading,
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
            let index = newSections.indexOf(sectionToToggle);
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
                    Toast.show({
                        type: 'info',
                        text1: 'You have reached the limit',
                        text2: 'You can only choose five topics.',
                        position: 'top',
                        autoHide: true,
                        visibilityTime: 5000
                    });
                }
            }
            return newSections;
        });
    };

    return (
        <View style={styles.topicSelectionContainer(loading)}>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.textTertiary} />
            ) : (
                <Accordion
                    containerStyle={styles.selectionWrapper}
                    sections={materials}
                    activeSections={activeCards}
                    keyExtractor={(item) => item.id}
                    renderHeader={(section, key, isActive) => (
                        <SelectionCard
                            section={section}
                            isSelected={choosenTopics.indexOf(key) !== -1}
                            isCollapsed={isActive}
                            updateSections={() => updateSections(key)}
                            handleSelect={() => handleSelect(key)}
                        />
                    )}
                    renderContent={(section, key, isActive) => (
                        <SelectionCollapsedView section={section} isCollapsed={isActive} />
                    )}
                    onChange={updateSections}
                    touchableComponent={TouchableOpacity}
                    disabled
                />
            )}
        </View>
    );
}
