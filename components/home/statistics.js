import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style/statistics';

import { formatPoints } from '../../utils/leaderboard.utils';

import { Fire, Badge, Token } from '../../assets/icons';

export default function Statistics({
    dailyStreak = 1,
    totalPoints = 0,
    overallRank = 0,
    dailyRank = 0
}) {
    return (
        <View style={styles.statistics}>
            <View style={styles.row}>
                <View style={styles.statisticsWrapper}>
                    <Fire size={25} color={'#FFA500'} />
                    <View style={styles.dataWrapper}>
                        <Text style={styles.statisticsValue}>{dailyStreak}</Text>
                        <Text style={styles.statisticsLabel}>Day Streak</Text>
                    </View>
                </View>
                <View style={styles.statisticsWrapper}>
                    <Image source={Badge} style={styles.statisticsIcon(25)} resizeMode="contain" />
                    <View style={styles.dataWrapper}>
                        <Text style={styles.statisticsValue}>
                            {!overallRank ? '--' : overallRank}
                        </Text>
                        <Text style={styles.statisticsLabel}>Overall Rank</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.statisticsWrapper}>
                    <Image source={Token} style={styles.statisticsIcon(25)} resizeMode="contain" />
                    <View style={styles.dataWrapper}>
                        <Text style={styles.statisticsValue}>{formatPoints(totalPoints)}</Text>
                        <Text style={styles.statisticsLabel}>Total Points</Text>
                    </View>
                </View>
                <View style={styles.statisticsWrapper}>
                    <Image source={Badge} style={styles.statisticsIcon(25)} resizeMode="contain" />
                    <View style={styles.dataWrapper}>
                        <Text style={styles.statisticsValue}>{!dailyRank ? '--' : dailyRank}</Text>
                        <Text style={styles.statisticsLabel}>Daily Rank</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
