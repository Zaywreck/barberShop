import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/screens/BarberMainScreen';

export default function App() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Barber Shop App</Text>
      </View>
      <MainScreen />
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Barber Shop</Text>
      </View>
      <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#232D3F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  headerText: {
    color: '#008170',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#232D3F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  footerText: {
    color: '#008170',
    fontSize: 12,
  },
});