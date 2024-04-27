import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const ImageWidget = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../images/barberLogo.png')} style={{width: '100%', height: 200}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'white',
  },
});

export default ImageWidget