import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BarberMainScreen from './src/screens/BarberMainScreen';
import CustomerMainScreen from './src/screens/CustomerMainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen/welcome';
import MapScreen from './src/components/map/map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BarberMain" component={BarberMainScreen} />
        <Stack.Screen name="CustomerMain" component={CustomerMainScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}