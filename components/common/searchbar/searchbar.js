import React from 'react';
import { SearchBar } from '@rneui/themed';

import styles from './searchbar.style';

// TODO: Add some props below
export default function Searchbar() {
    return (
        <SearchBar
            platform="default"
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
            placeholder="Search Learning Materials"
            placeholderTextColor="#1E2142"
            lightTheme={true}
            round
            cancelButtonTitle="Cancel"
        />
    );
}
