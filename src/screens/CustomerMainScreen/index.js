import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BarberInfo from '../../components/barberInfo/barberInfo';
import colors from '../../constants/colors';
import Appointment from '../../components/customerAppointment/appointment';
import AdditionalInfo from '../../components/additionalInfo/additionalInfo';
import Reviews from '../../components/reviews/reviews';

const CustomerMainScreen = () => {
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
                        style={[styles.tabItem, activeTab === 'services' && styles.activeTab]}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    appointmentContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: colors.black,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.primary500,
        paddingVertical: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        backgroundColor: colors.primary400,
    },
    tabText: {
        color: colors.gold,
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});

export default CustomerMainScreen;
