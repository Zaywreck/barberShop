import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CalendarComponents from '../../components/calendar/calendar';
import Appointment from '../../components/customerAppointment/appointment';
import styles from './styles';

const hours = [
    '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
];

const CustomerMainScreen = () => {
    const renderHourItem = ({ item }) => (
        <View style={styles.hourBox}>
            <Text style={styles.hourText}>{item}</Text>
        </View>
    );

    const handleAppoint = () => {
        console.log('Selected Services:', selectedServices);
    };

    const renderMainItem = ({ item }) => {
        if (item.type === 'calendar') {
            return <CalendarComponents />;
        } else if (item.type === 'hours') {
            return (
                <View>
                    <Text style={styles.text}>Müsait Saatler</Text>
                    <FlatList
                        data={hours}
                        renderItem={renderHourItem}
                        keyExtractor={(item) => item}
                        numColumns={3}
                        contentContainerStyle={styles.hoursContainer}
                    />
                </View>
            );
        } else if (item.type === 'appointment') {
            return (
                <View>
                    <Text style={styles.text}>Verilen Hizmetler</Text>
                    <Appointment />
                    <Text style={styles.instructionText}>Lütfen almak istediğiniz hizmet(ler)i seçiniz.</Text>
                    <TouchableOpacity style={styles.appointButton} onPress={handleAppoint}>
                        <Text style={styles.buttonText}>Randevu oluştur</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    const mainData = [
        { type: 'calendar' },
        { type: 'hours' },
        { type: 'appointment' }
    ];

    return (
        <FlatList
            data={mainData}
            renderItem={renderMainItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
        />
    );
}

export default CustomerMainScreen;
