import { SafeAreaView } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './styles';
import Hours from '../../components/dates/hours';
import CalendarComponents from '../../components/calendar/calendar';
import AppContext from '../../context/AppContext';

const BarberMainScreen = () => {
    const { shopInfo } = useContext(AppContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <SafeAreaView style={styles.container}>
            <CalendarComponents selectedDate={selectedDate} onDateChange={setSelectedDate} />
            {shopInfo && (
                <Hours selectedDate={selectedDate} isBarber={true} />
            )}
        </SafeAreaView>
    );
};

export default BarberMainScreen;
