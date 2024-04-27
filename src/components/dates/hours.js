import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView  } from 'react-native';
import AppointmentWidget from '../appointments/appointmentWidget';

const Hours = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Sample appointment data
        const appointment1 = {
            time: '9:00', // Add time property
            customerName: 'Mert Gülle',
            services: [
                { name: 'Saç', approved: true },
                { name: 'Sakal', approved: false },
                { name: 'Yıkama', approved: true },
                { name: 'Ağda', approved: true },
                { name: 'Maske', approved: true },
                { name: 'Kulak', approved: false },
            ],
        };
        const appointment2 = {
            time: '10:00', // Add time property
            customerName: 'Sena Nur Eren',
            services: [
                { name: 'Saç', approved: true },
                { name: 'Sakal', approved: false },
                { name: 'Yıkama', approved: true },
                { name: 'Ağda', approved: true },
                { name: 'Maske', approved: true },
                { name: 'Kulak', approved: false },
            ],
        };
        const appointment3 = {
            time: '11:00', // Add time property
            customerName: 'Mert Gülle',
            services: [
                { name: 'Saç', approved: true },
                { name: 'Sakal', approved: false },
                { name: 'Yıkama', approved: true },
                { name: 'Ağda', approved: true },
                { name: 'Maske', approved: true },
                { name: 'Kulak', approved: false },
            ],
        };
        const appointment4 = {
            time: '18:00', // Add time property
            customerName: 'Sena Nur Eren',
            services: [
                { name: 'Saç', approved: true },
                { name: 'Sakal', approved: false },
                { name: 'Yıkama', approved: true },
                { name: 'Ağda', approved: true },
                { name: 'Maske', approved: true },
                { name: 'Kulak', approved: false },
            ],
        };
    
        // Add example appointments to the state
        setAppointments([appointment1, appointment2, appointment3, appointment4]);
    }, []); // Run only on component mount

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.hoursContainer}>
                {/* Display hours and appointments */}
                {Array.from({ length: 10 }).map((_, index) => {
                    const hour = index + 9; // Assuming the shop opens at 9:00
                    const time = `${hour}:00`;
                    const appointment = appointments.find((appt) => appt.time === time);

                    return (
                        <View key={index} style={styles.hourRow}>
                            <Text style={styles.hourText}>{time}</Text>
                            {appointment ? (
                                <AppointmentWidget
                                    customerName={appointment.customerName}
                                    appointmentTime={appointment.appointmentTime}
                                    services={appointment.services} // Ensure services array is passed
                                />
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
        backgroundColor: '#0F0F0F',
    },
    hoursContainer: {
        padding: 10,
        paddingTop: 30,
    },
    hourRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items to the top
        borderBottomWidth: 1,
        borderBottomColor: '#005B41',
        paddingVertical: 10,
    },
    hourText: {
        color: '#008170',
        fontSize: 16,
    },
    appointmentText: {
        color: '#008170',
        fontSize: 16,
    },
});

export default Hours;
