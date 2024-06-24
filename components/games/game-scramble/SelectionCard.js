import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/selectionCard.style';

import { ChevronUp, ChevronDown } from '../../../assets/icons';

export default function SelectionCard({
    section,
    isSelected,
    isCollapsed,
    updateSections,
    handleSelect
}) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <TouchableOpacity
            style={styles.selectionCard(isSelected, isCollapsed)}
            onPress={handleSelect}
        >
            <View style={styles.headerWrapper}>
                <Text style={styles.selectionTitle}>{section.name}</Text>
                <Text style={styles.selectionItemCount}>{section.noOfItems} terms</Text>
            </View>
            <View style={styles.chevronWrapper}>
                <TouchableOpacity onPress={updateSections}>
                    {!isCollapsed ? (
                        <ChevronDown style={styles.chevron} />
                    ) : (
                        <ChevronUp style={styles.chevron} />
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
