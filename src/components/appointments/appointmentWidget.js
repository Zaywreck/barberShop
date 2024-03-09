import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons

const AppointmentWidget = ({ customerName, appointmentTime, services }) => {
  const [showServices, setShowServices] = useState(false); // State to control visibility of services

  const toggleServices = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Configure animation
    setShowServices(!showServices); // Toggle visibility of services
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleServices}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customerName}</Text>
        </View>
        {/* <Text style={styles.appointmentTime}>{appointmentTime}</Text> */}
        <Ionicons name={showServices ? 'chevron-up' : 'chevron-down'} size={24} color="gray" />
      </TouchableOpacity>
      {showServices && (
        <View style={styles.servicesContainer}>
          <View style={styles.servicesRow}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceText}>{service.name}</Text>
                {service.approved ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                ) : (
                  <Ionicons name="close-circle" size={24} color="red" />
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232D3F', // Dark background color
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
  appointmentTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Appointment time color
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Customer name color
    marginLeft: 10,
  },
  servicesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#005B41', // Lighter green color for border
    paddingTop: 10,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    color: 'white', // Darker blue color for service text
  },
});

export default AppointmentWidget;
