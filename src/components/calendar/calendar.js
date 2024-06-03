import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import colors from '../../constants/colors';

const CalendarComponents = ({ onDateChange }) => {
    const [selected, setSelected] = useState('');

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        if (new Date(selectedDate) < new Date(new Date().toDateString())) {
            alert('Geçmiş tarihler için işlem yapamazsınız!');
            return;
        }
        setSelected(selectedDate);
        if (onDateChange) {
            onDateChange(new Date(selectedDate));
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                style={{ borderRadius: 20, marginTop: 20, marginBottom: 20 }}
                onDayPress={handleDayPress}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.primary500,
        borderRadius: 15,
        overflow: 'hidden',
    },
});

export default CalendarComponents;
