import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import CalendarComponents from '../../components/calendar/calendar';
import Appointment from '../../components/customerAppointment/appointment';
import styles from './styles';
import TimeWidget from '../../components/timeWidget/TimeWidget';

const CustomerMainScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected Date:", date.toLocaleDateString());
    };

    const mainData = [
        { type: 'calendar' },
        { type: 'time' },
        { type: 'appointment' }
    ];

    return (
        <FlatList
            data={mainData}
            renderItem={({ item }) => {
                if (item.type === 'calendar') {
                    return <CalendarComponents onDateChange={handleDateChange} />;
                } else if (item.type === 'time') {
                    return (
                        <View>
                            <Text style={styles.text}>Müsait Saatler</Text>
                            <TimeWidget setSelectedHour={setSelectedHour} selectedDate={selectedDate} />
                        </View>
                    );
                } else if (item.type === 'appointment') {
                    return (
                        <View>
                            <Text style={styles.text}>Verilen Hizmetler</Text>
                            <Appointment selectedDate={selectedDate} selectedHour={selectedHour} />
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
