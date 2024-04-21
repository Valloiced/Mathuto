import React from 'react';
import { View, Text, Image } from 'react-native';

import { User } from '../../assets/icons';

import styles from './style/leaderboardModal.style';

function LeaderboardModalCard({ rank, username, profileImg = '', score }) {
    return (
        <View style={styles.leaderboardCard}>
            <Text style={styles.rank}>{rank}</Text>
            <View style={styles.leaderboardCardWrapper}>
                <View style={styles.rankerWrapper}>
                    <View style={styles.rankerImgWrapper}>
                        <Image
                            source={!profileImg ? User : { uri: profileImg }}
                            style={styles.rankerImg}
                        />
                    </View>
                    <Text style={styles.ranker}>{username}</Text>
                </View>
                <Text style={styles.points}>{`${score} pts`}</Text>
            </View>
        </View>
    );
}

export default function LeaderboardModal({ scores }) {
    const leaderboardModalCards = scores.map((score, index) => (
        <LeaderboardModalCard
            key={score.id}
            id={score.id} // Optional, maybe needed in future
            uid={score.uid} // Optional, maybe needed in future
            rank={index + 4}
            username={score.username}
            profileImg={score.profileImg}
            score={score.score}
        />
    ));

    return (
        <View style={styles.leaderboardModal}>
            {scores.length ? (
                <>
                    <Text style={styles.refreshNote}>
                        Refreshes every 10 mins
                    </Text>
                    {leaderboardModalCards}
                </>
            ) : (
                <Text style={styles.statusText}>
                    No Players Available Yet. Leaderboard would later be
                    updated.
                </Text>
            )}
        </View>
    );
}
