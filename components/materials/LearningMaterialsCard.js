import React from 'react';
import { router } from 'expo-router';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import useTheme from '../../hooks/useTheme';
import useCache from '../../hooks/useCache';

import getStyles  from './style/learningMaterials.style';

import { User } from '../../assets/icons';
import itemBGRed from '../../assets/bg/material-red.png';
import { COLORS, SHADOWS } from '../../constants/theme';

export default function LearningMaterialsCard({ topicId, topicName, itemCount, creator, version }) {
    const { data, cacheData } = useCache('recent-topics', []);
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);
    
    const addToRecentView = async () => {
        try {
            const recentTopics = data;

            const dataToAdd = {
                id: topicId,
                name: topicName,
                noOfItems: itemCount,
                creator: creator,
                __v: version
            };

            // If no recent views have made up yet
            if (!recentTopics) {
                cacheData([dataToAdd]);
                return;
            }

            const checkIfExists = recentTopics.findIndex((topic) => topic.id === topicId);

            // If item already exists, move it to the start
            if (checkIfExists !== -1) {
                let temp = recentTopics[checkIfExists];

                // If the data was updated from the server, renew the saved recent
                if (!temp.__v || temp?.__v !== version) {
                    temp = dataToAdd;
                }

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

            cacheData(recentTopics);
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
                            <Text style={styles.materialTitle}>{topicName}</Text>
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
