import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const LoginScreen = () => {
    const navigation = useNavigation(); // Hook for navigation

    // Function to handle login button press
    const handleLogin = () => {
        // Assuming you have authentication logic and role check here
        const userRole = 'barber'; // Example role

        // Redirect based on user role
        if (userRole === 'barber') {
            navigation.navigate('Barber'); // Navigate to BarberScreen
        } else if (userRole === 'customer') {
            navigation.navigate('Customer'); // Navigate to CustomerScreen
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
                />
                <TextInput
                    style={styles.input}
                    placeholder='Şifre...'
                    secureTextEntry={true} // Mask the password input
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
