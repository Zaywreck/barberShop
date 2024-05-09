import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppContext from '../../context/AppContext'; // Import your AppContext
import colors from '../../constants/colors';

const Appointment = () => {
  const { services } = useContext(AppContext);
  console.log('Services:', services);
  const availableServices = Object.keys(services).sort((a, b) => a - b);
  console.log('Available Services:', availableServices);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <Text>Ücret: ₺{services[item].price}</Text>
    </TouchableOpacity>
  );

  const handleAppoint = () => {
    console.log('Selected Services:', selectedServices);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary500} style={styles.loadingIndicator} />
      ) : (
        <>
          <FlatList
            data={availableServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item}
            extraData={selectedServices}
          />
          <Text style={styles.text}>Lütfen almak istediğiniz hizmet(ler)i seçiniz.</Text>
          <TouchableOpacity style={styles.appointButton} onPress={handleAppoint}>
            <Text style={styles.buttonText}>Randevu oluştur</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  selectedService: {
    backgroundColor: colors.primary100,
  },
  appointButton: {
    marginTop: 20,
    backgroundColor: colors.secondary500,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    backgroundColor: colors.primary500,
    color: colors.gold,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Appointment;
