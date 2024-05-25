import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import AppContext from '../../context/AppContext';
import colors from '../../constants/colors';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Appointment = ({selectedDate,selectedHour }) => {
  const { firestore, auth, services } = useContext(AppContext);
  const availableServices = Object.keys(services).sort((a, b) => a - b);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState('');

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
  const handleAppoint = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Kullanıcı kimliği doğrulanmadı');

      const userDocRef = doc(firestore, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error('Kullanıcı belgesi bulunamadı');

      const fullName = userDoc.data().fullName;
      const date = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

      const appointmentData = {
        fullName,
        services: selectedServices,
        date,
        hour: selectedHour,
        note
      };

      const appointmentRef = doc(firestore, 'appointments', date, 'appointments', user.uid);
      await setDoc(appointmentRef, appointmentData);
      alert('Randevu başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Randevu oluşturulurken hata:', error);
      alert('Randevu oluşturulamadı. Lütfen tekrar deneyin.');
    }
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
          <Text style={styles.instructionText}>Lütfen almak istediğiniz hizmet(ler)i seçiniz.</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Not"
            value={note}
            onChangeText={setNote}
          />
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    textAlign: 'center',
    backgroundColor: colors.primary500,
    color: colors.gold,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.primary500,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default Appointment;
