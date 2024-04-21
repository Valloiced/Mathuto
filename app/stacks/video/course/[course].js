import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

export default function Video() {
    const params = useLocalSearchParams();

    console.log(params);
    return (
        <View>
            <Text>Welcome to Course View</Text>
        </View>
    );
}
