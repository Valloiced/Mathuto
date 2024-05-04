import React, { useId, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { View, Text, ActivityIndicator } from 'react-native';

import useCache from '../../../hooks/useCache';

import { filterPlayableTerms } from './game/utils/game.utils';

import useNetStatus from '../../../hooks/useNetStatus';
import styles from './style/selectionCollapsedView.style';

// For bullet lists
function RenderBulletList({ term }) {
    return <Text style={styles.termItem}>{`\u2022 ${term}`}</Text>;
}

export default function SelectionCollapsedView({ section, isCollapsed }) {
    const id = useId();
    const { isConnected } = useNetStatus();
    const { data, loadingCache } = useCache('topics', []);

    const [playableTerms, setPlayableTerms] = useState([]);

    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsFetching(true);

            /** Fetch lesson data for the topics fetched */
            const topicRes = await axios.get(
                `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${section.id}?exclude_fields=content,createdOn`
            );

            const lessons = topicRes.data.lessons;

            setPlayableTerms(filterPlayableTerms(lessons));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    }, [section]);

    const fetchDataFromCache = useCallback(() => {
        const findTopic = data.find(
            (topic) => topic.details?.id === section.id
        );

        if (findTopic) {
            return findTopic.lessons;
        } else {
            return [];
        }
    }, [data, section]);

    useEffect(() => {
        if (isCollapsed && loading) {
            if (isConnected && !isFetching) {
                fetchData();
            }

            if (isConnected === false && !loadingCache) {
                const lessons = fetchDataFromCache();

                setPlayableTerms(filterPlayableTerms(lessons));
                setLoading(false);
            }
        }
    }, [
        fetchData,
        isCollapsed,
        isConnected,
        isFetching,
        loading,
        loadingCache,
        fetchDataFromCache
    ]);

    /** Render Methods */
    const splitColumn = (arr, termsPerRow, limit) => {
        var result = [];
        for (var i = 0; i < arr.length; i += termsPerRow) {
            if (limit <= result.length) {
                break;
            }

            result.push(arr.slice(i, i + termsPerRow));
        }
        return result;
    };

    const renderColumn = () => {
        const termColumns = splitColumn(playableTerms, 4, 2); // terms, termsPerRow, limit

        // Column (4 items)
        return termColumns.map((column, columnIndex) => (
            <View key={id + columnIndex} style={styles.termsColumn}>
                {/* Items */}
                {column.map((term, termIndex) => (
                    <RenderBulletList
                        key={term.term + termIndex}
                        term={term.term}
                    />
                ))}
            </View>
        ));
    };

    return (
        <View style={styles.selectionCardCollapse}>
            <View style={styles.collapsibleContainer}>
                <Text style={styles.collapsibleHeader}>Terms Available</Text>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.termsContainer}>
                            {renderColumn()}
                        </View>
                        {playableTerms.length > 6 && (
                            <Text style={styles.termsIndicator}>
                                And more...
                            </Text>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}
