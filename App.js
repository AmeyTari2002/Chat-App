import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddToChartScreen, ChatScreen, HomeScreen, LoginScreen, ProfileScreen, SignUpScreen, SplashScreen } from './screens';

import {Provider} from 'react-redux'
import store from './context/store';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
       <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddToChartScreen" component={AddToChartScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App