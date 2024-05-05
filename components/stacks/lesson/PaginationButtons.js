import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { ArrowLeft, ArrowRight } from '../../../assets/icons';

import styles from './style/paginationButtons.style';
import { COLORS, SHADOWS } from '../../../constants/theme';
import { router } from 'expo-router';

export default function PaginationButtons({ topicId, currentPage }) {
    const [disabledNext, setDisabledNext] = useState(true);
    const [disabledPrev, setDisabledPrev] = useState(true);

    useEffect(() => {
        const checkNextPage = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_SERVER}/api/materials/${topicId}/lesson/${Number(currentPage) + 1}`
                );

                if (response.data) {
                    setDisabledNext(false);
                }
            } catch (error) {
                if (error.response.status === 404) {
                    // Nahh, don't error
                    console.warn(`The next page doesn't exist.`);
                    Toast.show({
                        type: 'info',
                        text1: 'You reached the end of the lessons.',
                        position: 'top',
                        autoHide: true,
                        visibilityTime: 5000
                    });
                } else {
                    console.error(error);
                    Toast.show({
                        type: 'error',
                        text1: 'Something went wrong.',
                        text2: error.message,
                        position: 'bottom',
                        autoHide: true,
                        visibilityTime: 5000
                    });
                }
            }
        };

        if (currentPage > 1) {
            setDisabledPrev(false);
        }

        checkNextPage();
    }, [currentPage, topicId]);

    const handleNext = () => {
        // Ensure that it is not clickable if its disabled
        if (disabledNext) {
            return;
        }

        router.replace(`/stacks/topic/${topicId}/lesson/${Number(currentPage) + 1}`);
    };

    const handlePrev = () => {
        // Ensure that it is not clickable if its disabled
        if (disabledPrev) {
            return;
        }

        router.replace(`/stacks/topic/${topicId}/lesson/${Number(currentPage) - 1}`);
    };

    return (
        <View style={styles.paginationContainer}>
            <TouchableOpacity
                disabled={disabledPrev}
                style={[styles.paginationButton, !disabledPrev && SHADOWS.medium]}
                onPress={handlePrev}
            >
                <ArrowLeft color={!disabledPrev ? COLORS.tertiary : COLORS.disabled} size={20} />
                <Text style={styles.paginationBtnText(disabledPrev)}>PREV</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={disabledNext}
                style={[styles.paginationButton, !disabledNext && SHADOWS.medium]}
                onPress={handleNext}
            >
                <Text style={styles.paginationBtnText(disabledNext)}>NEXT</Text>
                <ArrowRight color={!disabledNext ? COLORS.tertiary : COLORS.disabled} size={20} />
            </TouchableOpacity>
        </View>
    );
}
