import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppContext from '../../context/AppContext';
import colors from '../../constants/colors';

const BarberSelect = ({ onBarberChange }) => {
    const { barbers } = useContext(AppContext);
    const [selectedBarber, setSelectedBarber] = useState(null);

    const handleBarberSelect = (barber) => {
        setSelectedBarber(barber);
        onBarberChange(barber);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Berber Seçin</Text>
            {barbers.map(barber => (
                <TouchableOpacity
                    key={barber.id}
                    style={[
                        styles.barberButton,
                        selectedBarber === barber.fullName && styles.selectedBarberButton,
                    ]}
                    onPress={() => handleBarberSelect(barber.fullName)}
                >
                    <Text
                        style={[
                            styles.barberButtonText,
                            selectedBarber === barber.fullName && styles.selectedBarberButtonText,
                        ]}
                    >
                        {barber.fullName}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    barberButton: {
        backgroundColor: colors.primary400,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    selectedBarberButton: {
        backgroundColor: colors.primary100,
    },
    barberButtonText: {
        fontSize: 14,
        color: colors.white,
    },
    selectedBarberButtonText: {
        color: colors.black,
    },
});

export default BarberSelect;
