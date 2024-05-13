import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firebase } from './firebase.utils';

const getRankings = async (uid, fields) => {
    fields = [].concat(fields);
    let ranks = {};
    try {
        const db = getFirestore(firebase);

        for (let field of fields) {
            const collectionName = field === 'overall' ? 'users' : field;
            const q = field === 'overall' ? 'totalPoints' : 'score';

            const leaderboardRef = collection(db, collectionName);
            const leaderboardQuery = query(leaderboardRef, orderBy(q, 'desc'));

            const leaderboardSnapshot = await getDocs(leaderboardQuery);

            let rank = 1;
            let found = false;
            for (let doc of leaderboardSnapshot.docs) {
                const docData = doc.data();

                if (docData.uid === uid) {
                    ranks[field] = {
                        rank: rank,
                        score: docData[q]
                    };
                    found = true;
                    break;
                }
                rank++;
            }

            if (!found) {
                ranks[field] = 0;
            }
        }

        return ranks;
    } catch (error) {
        console.error(error);
    }
};

export const formatPoints = (points = '') => {
    const pointsStr = points.toString();

    const formattedPoints = [];

    for (let i = pointsStr.length; i > 0; i -= 3) {
        formattedPoints.unshift(pointsStr.slice(Math.max(0, i - 3), i));

        if (i > 3) {
            formattedPoints.unshift(',');
        }
    }

    return formattedPoints.join('');
};


module.exports = { getRankings, formatPoints };
