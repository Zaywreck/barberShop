import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const PickerWidget = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected index
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track selected date

  const handleDateChange = (itemValue, itemIndex) => {
    setSelectedIndex(itemIndex); // Update selected index
    setSelectedDate(new Date(itemValue)); // Update selected date
    // Handle date change here
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedIndex} // Use selectedIndex instead of selectedDate
        style={styles.datePicker}
        onValueChange={handleDateChange}>
        {Array.from({ length: 7 }).map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          return (
            <Picker.Item
              key={index}
              label={date.toLocaleDateString('tr-TR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
              value={index} // Use index as value
              color="#008170"
            />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F0F0F',
  },
  datePicker: {
    height: 50,
    width: '100%',
    backgroundColor: '#232D3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PickerWidget;
