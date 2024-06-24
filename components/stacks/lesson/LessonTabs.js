import React from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/lessonTabs.style';

export default function LessonTabs({ currentTab, setCurrentTab }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <ScrollView
            contentContainerStyle={styles.lessonTabsContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
        >
            <TouchableOpacity
                style={styles.lessonTab(currentTab === 'summary')}
                onPress={() => setCurrentTab('summary')}
            >
                <Text style={styles.lessonTabText(currentTab === 'summary')}>Brief Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.lessonTab(currentTab === 'full')}
                onPress={() => setCurrentTab('full')}
            >
                <Text style={styles.lessonTabText(currentTab === 'full')}>Full Definition</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.lessonTab(currentTab === 'links')}
                onPress={() => setCurrentTab('links')}
            >
                <Text style={styles.lessonTabText(currentTab === 'links')}>External Links</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
