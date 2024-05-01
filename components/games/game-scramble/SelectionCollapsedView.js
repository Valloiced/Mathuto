import React, { useId } from 'react';
import { View, Text } from 'react-native';

import { filterPlayableTerms } from './game/utils/game.utils';

import styles from './style/selectionCollapsedView.style';

// For bullet lists
function RenderBulletList({ term }) {
    return <Text style={styles.termItem}>{`\u2022 ${term}`}</Text>;
}

export default function SelectionCollapsedView({ section }) {
    const id = useId();
    const playableTerms = filterPlayableTerms(section.lessons);

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
                <Text style={styles.collapsibleHeader}>Terms Included</Text>
                <View style={styles.termsContainer}>{renderColumn()}</View>
                {playableTerms.length > 6 && (
                    <Text style={styles.termsIndicator}>And more...</Text>
                )}
            </View>
        </View>
    );
}
