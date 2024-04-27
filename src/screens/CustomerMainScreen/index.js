import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import BarberInfo from '../../components/barberInfo/barberInfo'
import Appointment from '../../components/customerAppointment/appointment'

const CustomerMainScreen = () => {
    return (
        <View style={styles.container}>
            <BarberInfo />
            <Appointment />
        </View>
    )
}

export default CustomerMainScreen