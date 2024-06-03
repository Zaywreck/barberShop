import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import AppContext from '../../context/AppContext';
import colors from '../../constants/colors';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Appointment = ({ selectedDate, selectedHour, setSelectedHour, selectedBarber }) => {
  const { firestore, auth, services, fetchAppointmentsForDate } = useContext(AppContext);
  const availableServices = Object.keys(services).sort((a, b) => a - b);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState('');
  const [availableHours, setAvailableHours] = useState([]);

  useEffect(() => {
    const fetchAndSetAvailableHours = async () => {
      const appointments = await fetchAppointmentsForDate(selectedDate);
      const hours = generateAvailableHours(appointments, selectedBarber);
      setAvailableHours(hours);
      setIsLoading(false);
    };
    
    fetchAndSetAvailableHours();
  }, [selectedDate, selectedBarber]);

  const generateAvailableHours = (appointments, barber) => {
    const hours = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`);
    const barberAppointments = appointments.filter(appointment => appointment.barber === barber);
    const bookedHours = barberAppointments.map(appointment => appointment.hour);
    
    return hours.filter(hour => !bookedHours.includes(hour));
  };

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
        services: selectedServices.map(serviceId => ({
          id: serviceId,
          name: services[serviceId].name, // Include the name variable
          price: services[serviceId].price,
        })),
        date,
        hour: selectedHour,
        note,
        barber: selectedBarber,
      };

      const appointmentRef = doc(firestore, 'appointments', date, 'appointments', user.uid);
      await setDoc(appointmentRef, appointmentData);
      Alert.alert('Success', 'Randevu başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Randevu oluşturulurken hata:', error);
      Alert.alert('Error', 'Randevu oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

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
          <Text style={styles.instructionText}>Müsait Saatler:</Text>
          <View style={styles.hoursContainer}>
            {availableHours.map(hour => (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.hourButton,
                  selectedHour === hour && styles.selectedHourButton,
                ]}
                onPress={() => setSelectedHour(hour)}
              >
                <Text
                  style={[
                    styles.hourButtonText,
                    selectedHour === hour && styles.selectedHourButtonText,
                  ]}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.noteInput}
            placeholder="Not"
            value={note}
            onChangeText={setNote}
            multiline
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
    height: 100, // Adjust height for better multiline input
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hourButton: {
    backgroundColor: colors.primary400,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  selectedHourButton: {
    backgroundColor: colors.primary100,
  },
  hourButtonText: {
    fontSize: 14,
    color: colors.white,
  },
  selectedHourButtonText: {
    color: colors.black,
  },
});

export default Appointment;
