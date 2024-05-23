import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppContext from '../../context/AppContext';
import colors from '../../constants/colors';

const Appointment = () => {
  const { services } = useContext(AppContext);
  const availableServices = Object.keys(services).sort((a, b) => a - b);
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
      <Text style={styles.serviceName}>{services[item].name}</Text>
      <Text style={styles.servicePrice}>Ücret: ₺{services[item].price}</Text>
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
          {/* <Text style={styles.instructionText}>Lütfen almak istediğiniz hizmet(ler)i seçiniz.</Text>
          <TouchableOpacity style={styles.appointButton} onPress={handleAppoint}>
            <Text style={styles.buttonText}>Randevu oluştur</Text>
          </TouchableOpacity> */}
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
    backgroundColor: colors.primary400,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedService: {
    backgroundColor: colors.primary100,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  servicePrice: {
    fontSize: 14,
    color: colors.darkGray,
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
  instructionText: {
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
