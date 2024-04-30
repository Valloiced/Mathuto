import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';

import { Link } from '../../../assets/icons';

import RedirectDialog from '../../common/dialogs/RedirectDialog';

import styles from './style/content.style';

function LinkCard({ link, handleRedirect }) {
    return (
        <TouchableOpacity
            style={styles.linkCard}
            onPress={() => handleRedirect(link)}
        >
            <View style={styles.iconWrapper}>
                <Link style={styles.icon} />
            </View>
            <Text style={styles.link}>{link}</Text>
        </TouchableOpacity>
    );
}

export default function Description({ content, currentTab }) {
    const descriptionHeader =
        currentTab === 'summary'
            ? 'Brief Summary'
            : currentTab === 'full'
              ? 'Full Description'
              : 'External Links';

    /* Dialogs for profile update confirmation */
    const [modalVisible, setModalVisible] = useState(false);
    const [dialogCallback, setDialogCallback] = useState(() => () => {}); // Sheesh

    const handleRedirect = (link) => {
        const callback = (isRedirect) => {
            if (isRedirect) {
                Linking.openURL(link);
            }
        };

        setDialogCallback(() => callback);
        setModalVisible(true);
    };

    const links =
        currentTab === 'links' &&
        content.map((link, index) => (
            <LinkCard
                key={link + index}
                link={link}
                handleRedirect={handleRedirect}
            />
        ));

    return (
        <>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>{descriptionHeader}</Text>
                <View style={styles.contentContainer}>
                    {/* Modify this in the future, make this adaptable */}
                    {currentTab !== 'links' ? (
                        <Text style={styles.content}>{content}</Text>
                    ) : (
                        <View style={styles.linkCardContainer}>
                            {!links || links.length === 0 ? (
                                <Text style={styles.linkStatus}>
                                    No External Links Available
                                </Text>
                            ) : (
                                links
                            )}
                        </View>
                    )}
                </View>
            </View>
            <RedirectDialog
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                dialogCallback={dialogCallback}
                setDialogCallback={setDialogCallback}
            />
        </>
    );
}
