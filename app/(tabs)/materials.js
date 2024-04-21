import React from 'react';
import { StatusBar, View, ScrollView } from 'react-native';

import Banner from '../../components/materials/Banner';
// import Searchbar from '../../components/common/searchbar/searchbar';
import RecentlyViewed from '../../components/materials/RecentlyViewed';
import LearningMaterials from '../../components/materials/LearningMaterials';

import styles from '../../components/materials/style/material.style';

export default function Materials() {
    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="transparent"
            />
            <View style={styles.materialContainer}>
                <ScrollView style={styles.scrollView}>
                    <Banner />
                    {/* <Searchbar /> */}
                    <View style={styles.materialContent}>
                        <RecentlyViewed />
                        <LearningMaterials />
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
