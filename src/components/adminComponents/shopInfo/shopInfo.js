import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AppContext from '../../../context/AppContext';
import { doc, setDoc } from 'firebase/firestore';

const ShopInfoAdmin = () => {
  const { shopInfo,firestore } = useContext(AppContext);

  const [name, setName] = useState(shopInfo?.name || '');
  const [address, setAddress] = useState(shopInfo?.address || '');
  const [phone, setPhone] = useState(shopInfo?.phone || '');

  const handleSubmit = async () => {
    try {
      // Update shop info directly in state
      const updatedShopInfo = {
        ...shopInfo,
        name: name,
        address: address,
        phone: phone,
      };
      await updateShopInfoInFirebase(updatedShopInfo);

      Alert.alert('Success', 'Shop info updated successfully!');
    } catch (error) {
      console.error('Error updating shop info:', error);
      Alert.alert('Error', 'Error updating shop info. Please try again.');
    }
  };


  const updateShopInfoInFirebase = async (updatedShopInfo) => {
    try {
        const shopDocRef = doc(firestore, 'config', 'senanureren0058@gmail.com', 'shopConfig', 'shop');
        await setDoc(shopDocRef, updatedShopInfo, { merge: true });
        console.log('Shop info updated in Firebase:', updatedShopInfo);
    } catch (error) {
        console.error('Error updating shop info in Firebase:', error);
        throw new Error('Failed to update shop info');
    }
};

  return (
    <View style={styles.container}>
      <Text>Shop Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter shop name"
        style={styles.input}
      />
      <Text>Address:</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        style={styles.input}
      />
      <Text>Phone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Submit Changes" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default ShopInfoAdmin;
