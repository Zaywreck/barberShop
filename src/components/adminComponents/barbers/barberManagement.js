import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppContext from '../../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const BarberManagementScreen = () => {
    const { createBarberAccount, deleteBarberAccount, updateBarberAccount, firestore, auth, shopInfo } = useContext(AppContext);
    const [barbers, setBarbers] = useState([]);
    const [newBarberEmail, setNewBarberEmail] = useState('');
    const [newBarberFullName, setNewBarberFullName] = useState('');
    const [editBarberId, setEditBarberId] = useState(null);
    const [editBarberEmail, setEditBarberEmail] = useState('');
    const [editBarberFullName, setEditBarberFullName] = useState('');

    const fetchBarbers = async () => {
        const barbersRef = collection(firestore, 'config', 'senanureren0058@gmail.com', 'barbers');
        const barbersSnapshot = await getDocs(barbersRef);
        const barbersList = barbersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBarbers(barbersList);
    };

    useEffect(() => {
        fetchBarbers();
    }, [firestore]);

    const handleAddBarber = async () => {
        if (newBarberEmail && newBarberFullName) {
            await createBarberAccount(newBarberEmail, newBarberFullName);
            setNewBarberEmail('');
            setNewBarberFullName('');
            await fetchBarbers();
        } else {
            Alert.alert('Error', 'Please fill in both email and full name.');
        }
    };

    const handleDeleteBarber = async (barberId, email) => {
        await deleteBarberAccount(barberId, email);
        setBarbers(barbers.filter(barber => barber.id !== barberId));
    };

    const handleUpdateBarber = async () => {
        if (editBarberEmail && editBarberFullName) {
            await updateBarberAccount(editBarberId, editBarberEmail, editBarberFullName);
            setEditBarberId(null);
            setEditBarberEmail('');
            setEditBarberFullName('');
            await fetchBarbers();
        } else {
            Alert.alert('Error', 'Please fill in both email and full name.');
        }
    };

    const handleAddMyselfAsBarber = async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(firestore, 'config', 'senanureren0058@gmail.com', 'barbers', user.uid), {
                fullName: shopInfo.name || 'Dükkan Sahibi',
                email: user.email,
            });
            await fetchBarbers();
            Alert.alert('Success', 'You have been added as a barber.');
        } else {
            Alert.alert('Error', 'No authenticated user found.');
        }
    };

    const startEditBarber = (barber) => {
        setEditBarberId(barber.id);
        setEditBarberEmail(barber.email);
        setEditBarberFullName(barber.fullName);
    };

    const handleRefresh = async () => {
        await fetchBarbers();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Barber Management</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email...'
                    value={newBarberEmail}
                    keyboardType='email-address'
                    onChangeText={text => setNewBarberEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name...'
                    value={newBarberFullName}
                    onChangeText={text => setNewBarberFullName(text)}
                />
                <Button title="Add Barber" onPress={handleAddBarber} />
            </View>
            {editBarberId && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email...'
                        value={editBarberEmail}
                        keyboardType='email-address'
                        onChangeText={text => setEditBarberEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Full Name...'
                        value={editBarberFullName}
                        onChangeText={text => setEditBarberFullName(text)}
                    />
                    <Button title="Update Barber" onPress={handleUpdateBarber} />
                </View>
            )}
            <View style={styles.refreshContainer}>
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={24} color="blue" />
                    <Text style={styles.refreshText}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <Button title="Add Myself as a Barber" onPress={handleAddMyselfAsBarber} />
            {barbers.map(barber => (
                <View key={barber.id} style={styles.barberItem}>
                    <Text>{barber.fullName} ({barber.email})</Text>
                    <TouchableOpacity onPress={() => handleDeleteBarber(barber.id, barber.email)} style={styles.deleteIcon}>
                        <Ionicons name="trash-bin" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startEditBarber(barber)} style={styles.editIcon}>
                        <Ionicons name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
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
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 8,
        marginBottom: 8,
    },
    barberItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    deleteIcon: {
        marginLeft: 10,
    },
    editIcon: {
        marginLeft: 10,
    },
    refreshContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    refreshText: {
        marginLeft: 5,
        color: 'blue',
        fontSize: 16,
    },
});

export default BarberManagementScreen;
