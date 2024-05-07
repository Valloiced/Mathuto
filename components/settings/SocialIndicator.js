import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './style/socialIndicator.style';
import BrandIcons from '../../assets/icons/brands';

export default function SocialIndicator({ provider }) {
    const socialProvider = provider === 'google.com' ? 'Google' : 'Facebook';

    return (
        <View style={styles.socialIndicatorCard}>
            <Image
                source={BrandIcons[socialProvider]}
                style={styles.socialLogo}
            />
            <Text style={styles.socialProvider}>
                Signed in with {socialProvider}
            </Text>
        </View>
    );
}
