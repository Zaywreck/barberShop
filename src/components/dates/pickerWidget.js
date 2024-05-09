import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/colors';

const PickerWidget = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (itemValue, itemIndex) => {
    setSelectedIndex(itemIndex);
    setSelectedDate(new Date(itemValue));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedIndex}
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
              value={index}
              color={colors.primary500}
            />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  datePicker: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primary400,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
});

export default PickerWidget;
