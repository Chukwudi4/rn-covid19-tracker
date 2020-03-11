import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Brief } from '../screens/Brief'
import { Map } from '../screens/Map'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator()

function StackNav() {
    return(
        <Stack.Navigator>
            <Stack.Screen component={Brief} name='Brief' options={{headerShown: false}} />
            <Stack.Screen component={Map} name='Map' options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export function AppNav() {
    return(
        <NavigationContainer>
            <StackNav/>
        </NavigationContainer>
    )
}