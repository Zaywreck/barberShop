import { View, Text,  } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import PickerWidget from '../../components/dates/pickerWidget';
import Hours from '../../components/dates/hours';


const BarberMainScreen = () => {

    return (
        <View style={styles.container}>
            <PickerWidget />
            <Hours />
        </View>
    );
};

export default BarberMainScreen;
