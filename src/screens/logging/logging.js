import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import styles from "../logging/logging.style";
import { useSelector } from 'react-redux';

export default function LoggingScreen(props) {
    const logs = useSelector(state => state.logs);

    function handleNavigate(screenName) {
        const { navigation } = props;
        navigation.navigate(screenName);
    }

    function renderItem({item, index}) {
        return (
            <View style={styles.lineContainer}>
                <Text>Latitude: {item.coords?.latitude}</Text>
                <Text>Longitude: {item.coords?.longitude}</Text>
            </View>
        )
    }

    return (
        <View style={styles.logsContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Logging Locations</Text>

            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={logs.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.index}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button onPress={() => handleNavigate('Home')} title="Go to Home Screen" color={"#00cc00"} />
            </View>
        </View>
    )
}