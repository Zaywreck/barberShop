import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AppContext from '../../context/AppContext';
import ShopInfoAdmin from '../../components/adminComponents/shopInfo/shopInfo';
import ServicesAdmin from '../../components/adminComponents/services/services';
import BarberManagementScreen from '../../components/adminComponents/barbers/barberManagement';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const { logout } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('shopInfo');
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Error', 'An error occurred while logging out.');
      console.error('Logout error:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesAdmin />;
      case 'barbers':
        return <BarberManagementScreen />;
      case 'location':
        return (
          <View style={styles.tabContent}>
            <Text>Location Content Here</Text>
          </View>
        );
      default:
        return <ShopInfoAdmin />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'shopInfo' && styles.activeTab]} onPress={() => handleTabPress('shopInfo')}>
          <Text>Shop Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'services' && styles.activeTab]} onPress={() => handleTabPress('services')}>
          <Text>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'barbers' && styles.activeTab]} onPress={() => handleTabPress('barbers')}>
          <Text>Barbers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'location' && styles.activeTab]} onPress={() => handleTabPress('location')}>
          <Text>Location</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
