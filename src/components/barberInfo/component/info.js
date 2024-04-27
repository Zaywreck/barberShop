import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import barberShop from '../../../constants/barber';

const InfoWidget = () => {
  const { name, address, phone, workingHours, services } = barberShop;
  const navigation = useNavigation();

  const handleAddressPress = () => {
    navigation.navigate('Map', { address });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoPart}>
        <Text>{name}</Text>
        <TouchableOpacity onPress={handleAddressPress}>
          <Text>{address}</Text>
        </TouchableOpacity>
        <Text>{phone}</Text>
      </View>
      <View style={styles.hoursPart}>
        <Text>Open: {workingHours.open}</Text>
        <Text>Close: {workingHours.close}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  infoPart: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 5,
  },
  hoursPart: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    margin: 5,
  },
});

export default InfoWidget;
