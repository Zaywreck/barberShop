import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CalendarComponents from '../../components/calendar/calendar';
import Appointment from '../../components/customerAppointment/appointment';
import styles from './styles';
import BarberSelect from '../../components/customerAppointment/barberSelect';

const CustomerMainScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date.toLocaleDateString());
    };

    const handleBarberChange = (barber) => {
        setSelectedBarber(barber);
        console.log("Selected Barber:", barber);
    };

    const mainData = [
        { type: 'calendar' },
        { type: 'barberSelect' },
        { type: 'appointment' }
    ];

    return (
        <FlatList
            data={mainData}
            renderItem={({ item }) => {
                if (item.type === 'calendar') {
                    return <CalendarComponents onDateChange={handleDateChange} />;
                } else if (item.type === 'barberSelect') {
                    return <BarberSelect onBarberChange={handleBarberChange} />;
                } else if (item.type === 'appointment') {
                    return (
                        <View>
                            <Text style={styles.text}>Verilen Hizmetler</Text>
                            <Appointment selectedDate={selectedDate} selectedHour={selectedHour} setSelectedHour={setSelectedHour} selectedBarber={selectedBarber} />
                        </View>
                    );
                }
                return null;
            }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
        />
    );
}

export default CustomerMainScreen;
