import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AppContext from '../../../context/AppContext';

const AddBarber = () => {
  const { auth, firestore } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAddBarber = async () => {
    const password = fullName.replace(/\s+/g, ''); // Simplified password based on full name
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', email), {
        fullName: fullName,
        role: 'barber',
      });

      await setDoc(doc(firestore, 'config', 'senanureren0058@gmail.com', 'barbers', user.uid), {
        fullName: fullName,
        email: email,
      });

      Alert.alert('Success', 'Barber added successfully');
      setEmail('');
      setFullName('');
    } catch (error) {
      console.error('Error adding barber:', error);
      Alert.alert('Error', 'Error adding barber');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Barber</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Full Name'
        value={fullName}
        onChangeText={setFullName}
      />
      <Button title='Add Barber' onPress={handleAddBarber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default AddBarber;
