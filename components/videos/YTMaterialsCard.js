import React from 'react';
import { router } from 'expo-router';
import he from 'he';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';

import getStyles from './style/ytMaterials.style';

import useTheme from '../../hooks/useTheme';

import { User } from '../../assets/icons';
import { SHADOWS } from '../../constants/theme';
import { formatViews } from '../../utils/youtube.utils';

export default function YTMaterialsCard({
    id,
    title,
    thumbnail,
    channelName,
    channelImg,
    viewCount
}) {
    const decodeTitle = he.decode(title);
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/stacks/video/yt/${id}`);
            }}
        >
            <View style={styles.ytMaterialCard}>
                <ImageBackground
                    src={thumbnail}
                    imageStyle={styles.ytMaterialImg}
                    style={styles.ytMaterialThumbnail}
                />
                <View style={styles.ytMaterialDetails}>
                    <View style={[styles.imgContainer, SHADOWS.medium]}>
                        <Image
                            src={channelImg ? channelImg : User}
                            style={styles.ytCreatorImg}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.ytDetailsWrapper}>
                        <Text style={styles.ytMaterialTitle}>{decodeTitle}</Text>
                        <View style={styles.ytInfoWrapper}>
                            <Text style={styles.ytInfo}>{channelName}</Text>
                            <Text style={styles.ytInfo}>•</Text>
                            <Text style={styles.ytInfo}>{`${formatViews(viewCount)} views`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
