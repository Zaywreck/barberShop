import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleUserTypeSelection = (type) => {
    navigation.navigate(type === 'barber' ? 'BarberMain' : 'CustomerTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Barber Shop App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.barberButton]}
          onPress={() => handleUserTypeSelection('barber')}
        >
          <Text style={styles.buttonText}>I'm a Barber</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.customerButton]}
          onPress={() => handleUserTypeSelection('customer')}
        >
          <Text style={styles.buttonText}>I'm a Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700', // gold color
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  barberButton: {
    backgroundColor: '#ffd700', // gold color
  },
  customerButton: {
    backgroundColor: '#232D3F', // dark blue color
  },
});

export default WelcomeScreen;
