import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageWidget from './component/image';
import InfoWidget from './component/info';

const BarberInfo = () => {
  return (
    <View style={styles.container}>
     <ImageWidget />
     <InfoWidget />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BarberInfo