import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BarberInfo from '../../components/barberInfo/barberInfo';
import Appointment from '../../components/customerAppointment/appointment';
import MyAppointments from '../../components/myAppointments/myAppointments';
import Reviews from '../../components/reviews/reviews';
import styles from './styles';
import Hours from '../../components/dates/hours';

const CustomersBarberScreen = ({ currentCustomer }) => {
    const [activeTab, setActiveTab] = useState('appointments');
    const selectedDate = new Date();
    const renderContent = () => {
        switch (activeTab) {
            case 'appointments':
                // return current day's appointments
                return <Hours selectedDate={selectedDate} isBarber={false} />;
            case 'additionalInfo':
                return <MyAppointments currentCustomer={currentCustomer} />;
            case 'reviews':
                return <Reviews />;
            default:
                return <Appointment />;
        }
    };
    useEffect(() => {
        console.log("CustomersBarberScreen mounted");
        return () => {
            console.log("CustomersBarberScreen unmounted");
        };
    }, []);

    return (
        <View style={styles.container}>
            <BarberInfo />
            <View style={styles.appointmentContainer}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'appointments' && styles.activeTab]}
                        onPress={() => setActiveTab('appointments')}>
                        <Text style={styles.tabText}>Bugünkü Randevular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'additionalInfo' && styles.activeTab]}
                        onPress={() => setActiveTab('additionalInfo')}>
                        <Text style={styles.tabText}>Ek Bilgi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'reviews' && styles.activeTab]}
                        onPress={() => setActiveTab('reviews')}>
                        <Text style={styles.tabText}>Değerlendirmeler</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>{renderContent()}</View>
            </View>
        </View>
    );
};

export default CustomersBarberScreen;
