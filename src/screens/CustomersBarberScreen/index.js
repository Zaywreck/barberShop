import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BarberInfo from '../../components/barberInfo/barberInfo';
import colors from '../../constants/colors';
import Appointment from '../../components/customerAppointment/appointment';
import AdditionalInfo from '../../components/additionalInfo/additionalInfo';
import Reviews from '../../components/reviews/reviews';
import styles from './styles';

const CustomersBarberScreen = () => {
    const [activeTab, setActiveTab] = useState('services');

    const renderContent = () => {
        switch (activeTab) {
            case 'services':
                return <Appointment />;
            case 'additionalInfo':
                return <AdditionalInfo />;
            case 'reviews':
                return <Reviews />;
            default:
                return <Appointment />;
        }
    };

    return (
        <View style={styles.container}>
            <BarberInfo />
            <View style={styles.appointmentContainer}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'services' && styles.activeTab, ]}
                        onPress={() => setActiveTab('services')}>
                        <Text style={styles.tabText}>Services</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'additionalInfo' && styles.activeTab]}
                        onPress={() => setActiveTab('additionalInfo')}>
                        <Text style={styles.tabText}>Additional Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'reviews' && styles.activeTab]}
                        onPress={() => setActiveTab('reviews')}>
                        <Text style={styles.tabText}>Reviews</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>{renderContent()}</View>
            </View>
        </View>
    );
};

export default CustomersBarberScreen;
