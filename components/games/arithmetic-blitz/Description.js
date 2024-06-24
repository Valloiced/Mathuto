import React from 'react';
import { View, Text } from 'react-native';

import useTheme from '../../../hooks/useTheme';

import getStyles from './style/description.style';

// For bullet lists
function RenderBulletList({ styles, content }) {
    return <Text style={styles}>{`\u2022 ${content}`}</Text>;
}

export default function Description() {
    const [theme, changeTheme] = useTheme();

    const styles = getStyles(theme);

    return (
        <View style={styles.descriptionContainer}>
            <View style={styles.descriptionWrapper}>
                <View style={styles.description}>
                    <Text style={styles.header}>ABOUT THIS GAME</Text>
                    <Text style={styles.content}>
                        Welcome to Arithmetic Blitz! Where learning math is a thrilling journey full
                        of excitement and fun! Get ready to become a math hero by solving quick
                        puzzles in this exciting game.
                    </Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.header}>Game Mechanics</Text>
                    <RenderBulletList
                        styles={styles.content}
                        content={
                            'There would be group of numbers that would be presented in the screen in a short time frame.'
                        }
                    />
                    <RenderBulletList
                        styles={styles.content}
                        content={
                            'This group of numbers would have its corresponding operation and your goal is to chain and try to mentally solve these chains until it asks you to provide the answer.'
                        }
                    />
                    <RenderBulletList
                        styles={styles.content}
                        content={'You are only given 3 lives before you lose in the game.'}
                    />
                    <RenderBulletList
                        styles={styles.content}
                        content={
                            'The more you progress in the game, the faster the game would become.'
                        }
                    />
                    <RenderBulletList
                        styles={styles.content}
                        content={'Earn higher points the more you progress in the game.'}
                    />
                    <RenderBulletList
                        styles={styles.content}
                        content={'Good luck and have fun!'} 
                    />
                </View>
            </View>
        </View>
    );
}
