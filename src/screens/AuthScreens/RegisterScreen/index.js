import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import styles from './style';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const auth = getAuth();
    const db = getFirestore();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", email), {
                fullName: fullName,
                phoneNumber: phoneNumber,
                role: "customer"
            });

            navigation.navigate('Login');
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Registration Error", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Register</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email...'
                    value={email}
                    keyboardType='email-address'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password...'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name...'
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Phone Number...'
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                    keyboardType='phone-pad'
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
