import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar} from 'react-native-calendars';
import colors from '../../constants/colors';

const CalendarComponents = () => {
    const [selected, setSelected] = useState('');

    return (
        <View style={styles.container}>
            <Calendar style={{borderRadius:20, marginTop:20, marginBottom:20}}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding:10,
        backgroundColor: colors.primary500,
        borderRadius: 15, 
        //margin: 10, 
        overflow: 'hidden',
    },

});

export default CalendarComponents;