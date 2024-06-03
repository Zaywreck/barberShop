import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc } from "firebase/firestore";
import AppContext from '../../context/AppContext';

const AppointmentWidget = ({ customerName, services, note, availableServices, appointmentId, date, hour, canCancel }) => {
  const [showServices, setShowServices] = useState(false);
  const { firestore } = React.useContext(AppContext);

  const toggleServices = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowServices(!showServices);
  };

  const isServiceAvailable = (serviceName) => {
    const matchedService = availableServices.find(service => service.name === serviceName);
    return matchedService ? matchedService.name : null;
  };

  const handleCancelAppointment = async () => {
    try {
      const appointmentDocRef = doc(firestore, `appointments/${date}/appointments`, appointmentId);
      await deleteDoc(appointmentDocRef);
      Alert.alert('Randevu iptal edildi', 'Randevu başarıyla iptal edildi.');
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      Alert.alert('Hata', 'Randevu iptal edilirken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleServices}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customerName}</Text>
        </View>
        <Ionicons name={showServices ? 'chevron-up' : 'chevron-down'} size={24} color="gray" />
      </TouchableOpacity>
      {showServices && (
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Text style={styles.serviceText}>{service.name}</Text>
              {isServiceAvailable(service.name) ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              ) : (
                <Ionicons name="close-circle" size={24} color="red" />
              )}
            </View>
          ))}

          {note && (
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>Müşteri Notu: {note}</Text>
            </View>
          )}
          {canCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAppointment}>
              <Text style={styles.cancelButtonText}>Randevuyu İptal Et</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232D3F',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  servicesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#005B41',
    paddingTop: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
  },
  serviceText: {
    marginRight: 5,
    fontSize: 16,
    color: 'white',
  },
  noteContainer: {
    marginTop: 10,
  },
  noteText: {
    color: 'white',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppointmentWidget;
