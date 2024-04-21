import React from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ArrowLeft } from '../../assets/icons';

export default function ReturnHeaderBtn({ backTo = '' }) {
    const handleBack = () => {
        if (backTo) {
            router.replace(backTo);
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handleBack}>
            <ArrowLeft size={25} color={'#FFF'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#609CFF'
    }
});
