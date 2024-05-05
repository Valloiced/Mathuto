import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style/userRank.style';
import layoutStyles from './style/leaderboardModal.style';

import { User } from '../../assets/icons';

export default function UserRankCard({ isLogin, rank, score, profileImg = '' }) {
    return (
        <View style={[styles.userRankCard, layoutStyles.leaderboardCard]}>
            {!isLogin ? (
                <Text style={styles.status}>You must be login to show your rank.</Text>
            ) : !rank ? (
                <Text style={styles.status}>Play a game to be included in the leaderboard.</Text>
            ) : (
                <>
                    <Text style={[layoutStyles.rank, styles.rank]}>{rank}</Text>
                    <View style={[layoutStyles.leaderboardCardWrapper]}>
                        <View style={[layoutStyles.rankerWrapper]}>
                            <View style={[layoutStyles.rankerImgWrapper]}>
                                <Image
                                    source={!profileImg ? User : { uri: profileImg }}
                                    style={[layoutStyles.rankerImg]}
                                />
                            </View>
                            <Text style={[layoutStyles.ranker, styles.ranker]} numberOfLines={1}>
                                You
                            </Text>
                        </View>
                        <Text style={[layoutStyles.points, styles.points]}>{`${score} pts`}</Text>
                    </View>
                </>
            )}
        </View>
    );
}
