import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import CustomersBarberScreen from '../../screens/CustomersBarberScreen';
import CustomerMainScreen from '../../screens/CustomerMainScreen';
import CustomersAccountScreen from '../../screens/CustomersAccountScreen';

const Tab = createBottomTabNavigator();

const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Berber') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Randevu') {
            iconName = focused ? 'cut' : 'cut-outline';
          } else if(route.name === 'Hesabım'){
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
      <Tab.Screen name="Berber" component={CustomersBarberScreen} options={{ tabBarLabel: 'Berber', headerShown:false  }} />
      <Tab.Screen name="Randevu" component={CustomerMainScreen} options={{ tabBarLabel: 'Randevu',headerShown:false }}  />
      <Tab.Screen name="Hesabım" component={CustomersAccountScreen} options={{ tabBarLabel: 'Hesabım',headerShown:false }}  />
    </Tab.Navigator>
  );
};

export default CustomerTabNavigator;
