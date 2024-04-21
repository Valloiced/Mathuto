import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Facebook, Google } from '../../assets/icons/brands';

import styles from './styles/socialsContainer.style';

export default function SocialsContainer() {
    return (
        <View style={styles.socialsContainer}>
            <Text style={styles.socialSubtitle}>Sign in with</Text>
            <View style={styles.socialOptions}>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image
                        source={Facebook}
                        style={styles.socialIcons(20)}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image
                        source={Google}
                        style={styles.socialIcons(20)}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
