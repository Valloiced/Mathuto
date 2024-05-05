import React from 'react';
import { router } from 'expo-router';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import styles from './style/learningMaterials.style';

import { LinearGradient } from 'expo-linear-gradient';

import { User } from '../../assets/icons';
import itemBGRed from '../../assets/bg/material-red.png';
import { COLORS, SHADOWS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LearningMaterialsCard({ topicId, topicName, itemCount, creator }) {
    const addToRecentView = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-topics');
            const recentTopics = JSON.parse(response);

            const dataToAdd = {
                id: topicId,
                name: topicName,
                noOfItems: itemCount,
                creator: creator
            };

            // If no recent views have made up yet
            if (!recentTopics) {
                await AsyncStorage.setItem('recent-topics', JSON.stringify([dataToAdd]));
                return;
            }

            const checkIfExists = recentTopics.findIndex((topic) => topic.id === topicId);

            // If item already exists, move it to the start
            if (checkIfExists !== -1) {
                const temp = recentTopics[checkIfExists];
                recentTopics.splice(checkIfExists, 1);
                recentTopics.unshift(temp);
            } else {
                // Recent Viewed items are limited to 5 items. This act as a queue which removes the end of the limit and append the new one
                if (recentTopics.length === 5) {
                    recentTopics.pop();
                    recentTopics.unshift(dataToAdd);
                } else {
                    // If it is still not limited, just append the data;
                    recentTopics.unshift(dataToAdd);
                }
            }

            // Clear the storage first
            await AsyncStorage.removeItem('recent-topics');

            // Reset the updated item
            await AsyncStorage.setItem('recent-topics', JSON.stringify(recentTopics));
            return;
        } catch (error) {
            console.error('Failed to save in recent views.');
            /* Does not need to show error */
        }
    };

    const handlePress = async () => {
        await addToRecentView();

        router.push(`/stacks/topic/${topicId}`);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={SHADOWS.medium}>
                <ImageBackground
                    source={itemBGRed}
                    style={styles.learningMaterialsItem}
                    imageStyle={styles.itemBackground}
                >
                    <LinearGradient
                        colors={[COLORS.gradientWhite, 'transparent']}
                        style={styles.itemGradient}
                        start={{ x: 0.3, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.detailsWrapper}>
                            <Text style={styles.materialTitle} numberOfLines={1}>
                                {topicName}
                            </Text>
                            <Text style={styles.materialCount}>{`${itemCount} items`}</Text>
                        </View>
                        <View style={styles.creatorWrapper}>
                            <View style={[styles.imageContainer, SHADOWS.medium]}>
                                <Image
                                    source={User}
                                    style={styles.creatorIcon(20)}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.creator}>{creator}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}
