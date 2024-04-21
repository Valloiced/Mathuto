import React from 'react';
import { Text, View } from 'react-native';

import styles from './style/description.style';

export default function Description({ content }) {
    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description</Text>
            <View style={styles.contentContainer}>
                {/* Modify this in the future, make this adaptable */}
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    );
}
