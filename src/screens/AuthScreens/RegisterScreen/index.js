import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styles from './style'; // Assuming your styles are correctly defined

const RegisterScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Kayıt Ol</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder='Adınız...'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Soyadınız...'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Telefon Numaranız...'
                    keyboardType='phone-pad' // Show numeric keyboard
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
