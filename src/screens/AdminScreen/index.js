import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ShopInfoAdmin from '../../components/adminComponents/shopInfo/shopInfo';
import ServicesAdmin from '../../components/adminComponents/services/services';

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('shopInfo');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <ServicesAdmin />
        );
      case 'location':
        return (
          <View style={styles.tabContent}>
            <Text>Location Content Here</Text>
          </View>
        );
      default:
        return (
          <ShopInfoAdmin />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'shopInfo' && styles.activeTab]} onPress={() => handleTabPress('shopInfo')}>
          <Text>Shop Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'services' && styles.activeTab]} onPress={() => handleTabPress('services')}>
          <Text>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'location' && styles.activeTab]} onPress={() => handleTabPress('location')}>
          <Text>Location</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: 'lightblue',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminScreen;
