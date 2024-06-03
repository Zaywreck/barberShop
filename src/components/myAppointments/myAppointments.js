import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AppointmentWidget from '../appointments/appointmentWidget';
import colors from '../../constants/colors';
import AppContext from '../../context/AppContext';
import { collection, getDocs } from "firebase/firestore";

const MyAppointments = () => {
    const { firestore, getUserInfo, services } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentCustomerFullName, setCurrentCustomerFullName] = useState('');

    useEffect(() => {
        const fetchUserInfoAndAppointments = async () => {
            setIsLoading(true); // Start loading state

            try {
                const userInfo = await getUserInfo();
                setCurrentCustomerFullName(userInfo.fullName);

                const today = new Date();
                const futureAppointments = [];
                const pastAppointments = [];

                const fetchAppointmentsForDate = async (date) => {
                    const dateStr = date.toISOString().split('T')[0]; // Format selected date as YYYY-MM-DD
                    const appointmentsRef = collection(firestore, `appointments/${dateStr}/appointments`);
                    const querySnapshot = await getDocs(appointmentsRef);

                    querySnapshot.forEach((doc) => {
                        const appointment = { ...doc.data(), id: doc.id, date: dateStr };
                        if (appointment.fullName === userInfo.fullName) {
                            if (date >= today) {
                                futureAppointments.push(appointment);
                            } else {
                                pastAppointments.push(appointment);
                            }
                        }
                    });
                };

                // Create an array of promises for past and future dates
                const promises = [];
                for (let i = 0; i < 30; i++) {
                    const pastDate = new Date(today);
                    pastDate.setDate(today.getDate() - i);
                    promises.push(fetchAppointmentsForDate(pastDate));
                }

                for (let i = 1; i <= 30; i++) { // Start from 1 to avoid fetching today twice
                    const futureDate = new Date(today);
                    futureDate.setDate(today.getDate() + i);
                    promises.push(fetchAppointmentsForDate(futureDate));
                }

                // Await all promises
                await Promise.all(promises);

                setAppointments([...pastAppointments, ...futureAppointments]);
            } catch (error) {
                console.error("Error fetching user info or appointments:", error);
            }

            setIsLoading(false); // End loading state
        };

        fetchUserInfoAndAppointments();
    }, [firestore, getUserInfo]);

    if (isLoading) {
        return <ActivityIndicator size="large" color={colors.primary500} style={styles.loadingIndicator} />;
    }

    // Transform services object into an array
    const servicesArray = Object.values(services);

    const today = new Date();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.appointmentsContainer}>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <View key={index} style={styles.appointmentWrapper}>
                            <Text style={styles.appointmentDate}>
                                {appointment.date} - {appointment.hour}
                            </Text>
                            <AppointmentWidget
                                customerName={appointment.fullName}
                                appointmentTime={appointment.hour}
                                services={appointment.services}
                                availableServices={servicesArray}
                                note={appointment.note}
                                appointmentId={appointment.id}
                                date={appointment.date}
                                hour={appointment.hour}
                                canCancel={new Date(`${appointment.date}T${appointment.hour}`) > today}
                            />
                        </View>
                    ))
                ) : (
                    <Text style={styles.noAppointmentsText}>Gelecek randevunuz yok.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    appointmentsContainer: {
        paddingTop: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    noAppointmentsText: {
        textAlign: 'center',
        color: colors.primary500,
        fontSize: 16,
        marginTop: 20,
    },
    appointmentWrapper: {
        marginBottom: 20,
    },
    appointmentDate: {
        color: colors.primary500,
        fontSize: 16,
        marginBottom: 5,
    },
});

export default MyAppointments;
