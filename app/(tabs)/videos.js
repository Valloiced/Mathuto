import React, { useEffect } from 'react';
import { StatusBar, View, ScrollView } from 'react-native';

import Banner from '../../components/videos/Banner';
// import Searchbar from '../../components/common/searchbar/searchbar';
import YTMaterials from '../../components/videos/YTMaterials';

import styles from '../../components/materials/style/material.style';

export default function Videos() {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="transparent" />
            <View style={styles.videoContainer}>
                <ScrollView>
                    <Banner />
                    {/* Include this if video courses is available */}
                    {/* <Searchbar /> */}
                    <View style={styles.materialContent}>
                        <YTMaterials />
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
