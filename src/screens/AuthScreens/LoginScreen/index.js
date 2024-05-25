import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './style';
import AppContext, { AppProvider } from '../../../context/AppContext';

const LoginScreen = () => {
    const context = useContext(AppContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {auth,firestore} = context;

    // useEffect(() => {
    //     // Check if user is already logged in
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, navigate to appropriate screen
    //             const userRole = getUserRoleFromFirestore(user.email);
    //             if (userRole === 'barber') {
    //                 navigation.replace('BarberMain');
    //             } else if (userRole === 'customer') {
    //                 navigation.replace('CustomerMain');
    //             }
    //         } else {
    //             // User is signed out
    //         }
    //     });

    //     return unsubscribe; // Cleanup function
    // }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Get user role from Firestore
            const userDocRef = doc(firestore, 'users', email);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                const userRole = userData.role; 

                // Redirect based on user role
                if (userRole === 'barber') {
                    navigation.navigate('BarberMain');
                } else if (userRole === 'customer') {
                    navigation.navigate('CustomerTab');
                } else {
                    Alert.alert("Error", "Invalid user role.");
                }
            } else {
                Alert.alert("Error", "User data not found.");
            }
        } catch (error) {
            Alert.alert("Login Error", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginHeader}>
                <Image source={require('../../../images/barberLogo.png')} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.welcomeText}>Hoşgeldiniz</Text>
            </View>
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
                    placeholder='Şifre...'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                {/* Call handleLogin on button press */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Hesabınız yok mu?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    {/* Navigate to RegisterScreen */}
                    <Text style={styles.registerText}>Kayıt Olun</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
