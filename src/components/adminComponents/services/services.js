import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import AppContext from '../../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore';

const ServicesAdmin = () => {
    const { services, firestore } = useContext(AppContext);
    const [updatedServices, setUpdatedServices] = useState(services);
    const [activeTab, setActiveTab] = useState('view');

    const updateServices = async (updatedData) => {
        try {
            const servicesDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'services');
            await setDoc(servicesDocRef, updatedData);
            console.log('Services data updated successfully:', updatedData);
        } catch (error) {
            console.error('Error updating services:', error);
            throw new Error('Error updating services data: ' + error.message);
        }
    };
    

    const handleUpdate = async () => {
        try {
            await updateServices(updatedServices);
            Alert.alert('Success', 'Services data updated successfully!');
        } catch (error) {
            console.error('Error updating services:', error);
            Alert.alert('Error', 'Failed to update services data. Please try again.');
        }
    };

    const handleInputChange = (key, field, value) => {
        let updatedData;
        if (key in updatedServices) {
            // Update existing service
            updatedData = {
                ...updatedServices,
                [key]: {
                    ...updatedServices[key],
                    [field]: value,
                },
            };
        } else {
            // Add new service
            updatedData = {
                ...updatedServices,
                [key]: {
                    [field]: value,
                },
            };
        }
        setUpdatedServices(updatedData);
    };

    const handleDeleteService = (serviceKey) => {
        const updatedData = { ...updatedServices };
        delete updatedData[serviceKey];
        setUpdatedServices(updatedData);
    };

    const handlePriceInputBlur = () => {
        Keyboard.dismiss();
    };

    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePriceInputBlur}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>ServicesAdmin</Text>
                <View style={styles.tabs}>
                    <TouchableOpacity style={[styles.tab, activeTab === 'view' && styles.activeTab]} onPress={() => handleTabPress('view')}>
                        <Text>View Services</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, activeTab === 'add' && styles.activeTab]} onPress={() => handleTabPress('add')}>
                        <Text>Add Service</Text>
                    </TouchableOpacity>
                </View>
                {activeTab === 'view' && (
                    <>
                        {Object.keys(updatedServices).map((serviceKey) => (
                            <View key={serviceKey} style={styles.serviceItem}>
                                <TouchableOpacity onPress={() => handleDeleteService(serviceKey)} style={styles.deleteIcon}>
                                    <Ionicons name="close-circle" size={24} color="red" />
                                </TouchableOpacity>
                                <Text style={styles.serviceName}>{serviceKey}</Text>
                                <Text>ID: {updatedServices[serviceKey].id}</Text>
                                <Text>Name:</Text>
                                <TextInput
                                    value={updatedServices[serviceKey]?.name || ''}
                                    onChangeText={(text) => handleInputChange(serviceKey, 'name', text)}
                                    style={styles.input}
                                />
                                <Text>Price:</Text>
                                <TextInput
                                    value={updatedServices[serviceKey]?.price?.toString() || ''}
                                    onChangeText={(text) => handleInputChange(serviceKey, 'price', parseInt(text) || 0)}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    onBlur={handlePriceInputBlur}
                                />
                            </View>
                        ))}
                    </>
                )}
                {activeTab === 'add' && (
                    // Add Service Form
                    <View>
                        <Text>Add Service Form</Text>
                    </View>
                )}
                <Button title="Submit" onPress={handleUpdate} />
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tab: {
        padding: 8,
        borderRadius: 4,
    },
    activeTab: {
        backgroundColor: 'lightblue',
    },
    serviceItem: {
        marginBottom: 16,
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 8,
        marginBottom: 8,
    },
});

export default ServicesAdmin;
