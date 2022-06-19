import React from 'react';
import {
    HomeScreen,
    LoadContactsScreen
} from 'src/screens';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type NavigatorParamList = {
    HomeScreen: undefined;
    LoadContactsScreen: undefined;
}

const Stack = createNativeStackNavigator<NavigatorParamList>();

const MainStack = () => {
    return (
        <NavigationContainer children={
            <Stack.Navigator>

                <Stack.Screen
                    options={{
                        title: "App Name"
                    }}
                    name="HomeScreen"
                    component={HomeScreen} />

                <Stack.Screen
                    options={{
                        title: "Contacts",
                        headerBackTitle: ""
                    }}
                    name="LoadContactsScreen"
                    component={LoadContactsScreen} />

            </Stack.Navigator>
        } />
    )
}

export {
    MainStack
}