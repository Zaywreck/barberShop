import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import services from '../../constants/services';

const Appointment = () => {
  const availableServices = Object.keys(services);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];
    setSelectedServices(updatedServices);
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceItem, selectedServices.includes(item) && styles.selectedService]}
      onPress={() => toggleService(item)}
    >
      <Text>{services[item].name}</Text>
      <Text>Price: ₺{services[item].price}</Text>
    </TouchableOpacity>
  );

  const handleAppoint = () => {
    // Handle appointment logic here, such as navigating to appointment screen
    console.log('Selected Services:', selectedServices);
    // Navigate to the appointment screen or perform other actions
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={availableServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item}
        extraData={selectedServices}
      />
      <Text style={styles.text} >Lütfen almak istediğiniz hizmet(ler)i seçiniz.</Text>
      <TouchableOpacity style={styles.appointButton} onPress={handleAppoint}>
        <Text style={styles.buttonText}>Randevu oluştur</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedService: {
    backgroundColor: 'lightblue',
  },
  appointButton: {
    marginBottom: 20,
    backgroundColor: '#008080',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#304a78',
    color: 'gold',
    marginBottom: 10,
  },
});

export default Appointment;
