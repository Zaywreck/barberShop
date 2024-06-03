import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AppointmentWidget from '../appointments/appointmentWidget';
import colors from '../../constants/colors';
import AppContext from '../../context/AppContext';
import { collection, getDocs } from "firebase/firestore";

const Hours = ({ selectedDate, isBarber }) => {
  const { shopInfo, firestore, services, getUserInfo } = useContext(AppContext);
  const [hours, setHours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [currentCustomerFullName, setCurrentCustomerFullName] = useState('');

  useEffect(() => {
    const fetchWorkingHours = () => {
      if (shopInfo && shopInfo.workingHours) {
        const { open, close } = shopInfo.workingHours;
        const openHour = parseInt(open, 10);
        const closeHour = parseInt(close, 10);
        const hoursArray = [];

        for (let i = openHour; i < closeHour; i++) {
          const hourString = `${i.toString().padStart(2, '0')}:00`;
          hoursArray.push(hourString);
        }

        setHours(hoursArray);
      } else {
        console.error("No working hours found in shopInfo");
      }
      setIsLoading(false);
    };

    fetchWorkingHours();
  }, [shopInfo]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true); // Start loading state

      try {
        const dateStr = selectedDate.toISOString().split('T')[0]; // Format selected date as YYYY-MM-DD
        const appointmentsRef = collection(firestore, `appointments/${dateStr}/appointments`);
        const querySnapshot = await getDocs(appointmentsRef);
        const fetchedAppointments = [];

        querySnapshot.forEach((doc) => {
          fetchedAppointments.push({ ...doc.data(), id: doc.id });
        });

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      setIsLoading(false); // End loading state
    };

    if (selectedDate) {
      fetchAppointments();
    }
  }, [selectedDate, firestore]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setCurrentCustomerFullName(userInfo.fullName);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [getUserInfo]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary500} style={styles.loadingIndicator} />;
  }

  // Transform services object into an array
  const servicesArray = Object.values(services);

  const today = new Date();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hoursContainer}>
        {hours.map((hour, index) => {
          const appointment = appointments.find((appt) => appt.hour === hour);

          return (
            <View key={index} style={styles.hourRow}>
              <Text style={styles.hourText}>{hour}</Text>
              {appointment ? (
                isBarber || appointment.fullName === currentCustomerFullName ? (
                  <AppointmentWidget
                    customerName={appointment.fullName}
                    appointmentTime={appointment.hour}
                    services={appointment.services}
                    availableServices={servicesArray}
                    note={appointment.note}
                    appointmentId={appointment.id}
                    date={selectedDate.toISOString().split('T')[0]}
                    hour={appointment.hour}
                    barber={appointment.barber}
                    canCancel={isBarber || new Date(`${selectedDate.toISOString().split('T')[0]}T${appointment.hour}`) > today}
                  />
                ) : (
                  <View style={styles.blurredAppointment}>
                    <Text style={styles.blurredText}>Randevu (Müşteri)</Text>
                  </View>
                )
              ) : (
                <Text style={styles.appointmentText}>Müsait</Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  hoursContainer: {
    padding: 10,
    paddingTop: 30,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary500,
    paddingVertical: 10,
  },
  hourText: {
    color: colors.primary500,
    fontSize: 16,
  },
  appointmentText: {
    color: colors.primary300,
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  blurredAppointment: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  blurredText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
});

export default Hours;
