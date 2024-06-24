import React from 'react';
import { View, Text, Image } from 'react-native';

import getStyles from './style/topLeaderboard.style';

import useTheme from '../../hooks/useTheme';

import { formatPoints } from '../../utils/leaderboard.utils';

import { User } from '../../assets/icons';
import { SHADOWS } from '../../constants/theme';

export default function TopLeaderbord({ topScores }) {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    const firstRank = topScores[0] || {};
    const secondRank = topScores[1] || {};
    const thirdRank = topScores[2] || {};

    return (
        <View style={styles.topLeaderboard}>
            <View style={styles.secondRank}>
                <View
                    style={[
                        // Image Size, Border Color
                        styles.rankImgWrapper(70, '#09E98B'),
                        SHADOWS.medium
                    ]}
                >
                    <Image
                        source={!secondRank.profileImg ? User : { uri: secondRank.profileImg }}
                        style={[styles.rankImg]}
                    />
                    <View style={styles.rankIndicator('#09E98B')}>
                        <Text style={styles.rank('#004125')}>2</Text>
                    </View>
                </View>
                <View style={styles.rankDetails}>
                    <Text style={styles.ranker} numberOfLines={1} ellipsizeMode="tail">
                        {secondRank?.username || '--:--'}
                    </Text>
                    <View style={styles.pointsWrapper}>
                        <Text style={styles.points()}>
                            {formatPoints(secondRank?.score) || '--'}
                        </Text>
                        <Text style={styles.pointsLabel}>pts</Text>
                    </View>
                </View>
            </View>
            <View style={styles.firstRank}>
                <View
                    style={[
                        // Image Size, Border Color
                        styles.rankImgWrapper(90, '#FCD137'),
                        SHADOWS.medium
                    ]}
                >
                    <Image
                        source={!firstRank.profileImg ? User : { uri: firstRank.profileImg }}
                        style={[styles.rankImg]}
                    />
                    <View style={styles.rankIndicator('#FCD137', true)}>
                        <Text style={styles.rank('#4D3C00', true)}>1</Text>
                    </View>
                </View>
                <View style={styles.rankDetails}>
                    <Text style={styles.ranker} numberOfLines={1} ellipsizeMode="tail">
                        {firstRank?.username || '--:--'}
                    </Text>
                    <View style={styles.pointsWrapper}>
                        <Text style={styles.points('top')}>
                            {formatPoints(firstRank?.score) || '--'}
                        </Text>
                        <Text style={styles.pointsLabel}>pts</Text>
                    </View>
                </View>
            </View>
            <View style={styles.thirdRank}>
                <View
                    style={[
                        // Image Size, Border Color
                        styles.rankImgWrapper(70, '#48F4FF'),
                        SHADOWS.medium
                    ]}
                >
                    <Image
                        source={!thirdRank.profileImg ? User : { uri: thirdRank.profileImg }}
                        style={[styles.rankImg]}
                    />
                    <View style={styles.rankIndicator('#48F4FF')}>
                        <Text style={styles.rank('#00494E')}>3</Text>
                    </View>
                </View>
                <View style={styles.rankDetails}>
                    <Text style={styles.ranker} numberOfLines={1} ellipsizeMode="tail">
                        {thirdRank?.username || '--:--'}
                    </Text>
                    <View style={styles.pointsWrapper}>
                        <Text style={styles.points()}>
                            {formatPoints(thirdRank?.score) || '--'}
                        </Text>
                        <Text style={styles.pointsLabel}>pts</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
