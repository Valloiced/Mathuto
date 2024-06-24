import React from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useTheme from '../../hooks/useTheme';

import getStyles  from './style/recentlyViewed.style';

import itemBGYellow from '../../assets/bg/material-yellow.png';
import { COLORS, SHADOWS } from '../../constants/theme';

export default function RecentlyViewedCard({ id, topicName, itemCount, creator }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    
    const addToRecentView = async () => {
        try {
            const response = await AsyncStorage.getItem('recent-topics');
            const recentTopics = JSON.parse(response);

            const dataToAdd = {
                id: id,
                name: topicName,
                noOfItems: itemCount,
                creator: creator
            };

            // If no recent views have made up yet
            if (!recentTopics) {
                await AsyncStorage.setItem('recent-topics', JSON.stringify([dataToAdd]));
                return;
            }

            const checkIfExists = recentTopics.findIndex((topic) => topic.id === id);

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

        router.push(`/stacks/topic/${id}`);
    };
    return (
        <TouchableOpacity style={SHADOWS.medium} onPress={handlePress}>
            <View>
                <ImageBackground
                    source={itemBGYellow}
                    style={styles.recentlyViewedItem}
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
                            <Text
                                style={styles.materialCount}
                            >{`${itemCount} ${itemCount > 1 ? 'Items' : 'Item'}`}</Text>
                        </View>
                        <Text style={styles.creator}>{creator}</Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}
