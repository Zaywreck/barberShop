import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BarberMainScreen from './src/screens/BarberMainScreen';
import CustomerTabNavigator from './src/components/customerTabNav/customerTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen/welcome';
import MapScreen from './src/components/map/map';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import RegisterScreen from './src/screens/AuthScreens/RegisterScreen';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { AppProvider } from './src/context/AppContext';
import AdminScreen from './src/screens/AdminScreen';

const Stack = createNativeStackNavigator();
const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BarberMain" component={BarberMainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CustomerTab" component={CustomerTabNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
