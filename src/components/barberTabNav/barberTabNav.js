import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import BarberMainScreen from '../../screens/BarberMainScreen';
import AdminScreen from '../../screens/AdminScreen';

const Tab = createBottomTabNavigator();

const BarberTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Randevular') {
            iconName = focused ? 'home' : 'home-outline';
          } 
          else if(route.name === 'Hesabım'){
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Randevular" component={BarberMainScreen} options={{ tabBarLabel: 'Berber', headerShown:false  }} />
      <Tab.Screen name="Hesabım" component={AdminScreen} options={{ tabBarLabel: 'Hesabım',headerShown:false }}  />
    </Tab.Navigator>
  );
};

export default BarberTabNavigator;
