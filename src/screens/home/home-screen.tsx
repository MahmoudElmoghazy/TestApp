import React from 'react';
import { View } from 'react-native';
import { Button } from "components";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/core';
import { NavigatorParamList } from 'src/navigators/main-stack';

interface Props {
    navigation: NativeStackNavigationProp<NavigatorParamList, "HomeScreen">;
    route: RouteProp<NavigatorParamList, "HomeScreen">;
}

const HomeScreen = (props: Props) => {

    const loadContactsButtonPressed = () => {
        props.navigation.navigate('LoadContactsScreen');
    }

    return (
        <View>
            <Button title={"Load Contacts"} onPress={loadContactsButtonPressed} />
        </View>
    )
}

export {
    HomeScreen
}