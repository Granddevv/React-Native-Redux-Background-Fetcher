import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './home.style';
import { useDispatch } from 'react-redux';
import { UPDATE_CATS, REMOVE_CAT } from '../../store/actions';

export default function HomeScreen(props) {
    const cats = useSelector(state => state.cats);
    const dispatch = useDispatch();
    useEffect(() => {
        handleFetchCatsData()
    }, [])

    async function handleFetchCatsData() {
        try {
            let result = await axios.get(`https://cataas.com/api/cats`);
            dispatch({type: UPDATE_CATS, value: result.data})
        } catch (error) {

        }
    }

    function handleRemoveItem(index) {
        dispatch({type: REMOVE_CAT, value: index})
    }

    function handleNavigate(screenName) {
        const { navigation } = props;
        navigation.navigate(screenName);
    }

    function renderItem({item, index}) {
        return (
            <View style={styles.cardContainer}>
                <Image
                    style={styles.thumbnail}
                    source={{
                        uri: `https://cataas.com/cat/${item.id}`,
                    }}
                />
                <View style={styles.cardContent}>
                    <Text>{`Cat - ${index}`}</Text>
                    <Button onPress={() => handleRemoveItem(item.id)} title="Remove" color={"#ff0000"} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Home Screen</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={cats.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.index}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button onPress={() => handleNavigate('Logging')} title="Go to Logging Screen" color={"#00cc00"} />
            </View>
        </View>
    )
}