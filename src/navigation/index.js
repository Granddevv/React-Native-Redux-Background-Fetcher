import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import LoggingScreen from '../screens/logging';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import store from '../store';
import axios from "axios/index";

const Stack = createStackNavigator();

const LOCATION_TASK_NAME = 'background-location-task';

export default function Navigation() {
    useEffect(() => {
        handleStartLocationTracking();
    }, []);

    async function handleStartLocationTracking() {
        try {
            const resultForegroundPermission = await Location.requestForegroundPermissionsAsync();
            const resultBackgroundPermission = await Location.requestBackgroundPermissionsAsync();
            if (resultForegroundPermission.status === 'granted' || resultBackgroundPermission.status === 'granted') {
                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: Location.Accuracy.Balanced,
                });
            }
        } catch (err) {
            console.log("error is det", err)
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{header: () => null}}
                />
                <Stack.Screen
                    name="Logging"
                    component={LoggingScreen}
                    options={{header: () => null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    const state = store.getState();
    if (error) {
        return;
    }
    if (data) {
        const { locations } = data;
        if(state.logs?.data) {
            state.logs.data.push(locations[0]);
        }
        let result = await axios.get(`https://cataas.com/api/cats`);
        if(result && result.data) {
            state.cats.data = result.data;
        }
    }
});