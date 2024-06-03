import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import styles from './styles';
import AppContext from '../../context/AppContext';

export default function CustomersAccountScreen({ navigation }) {
  const { getUserInfo, logout } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('getUserInfo error:', err);
        setError(err);
        setLoading(false);
      });
  }, [getUserInfo]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary500} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>No user data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="pencil-outline" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{currentUser.fullName}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Bilgilerim</Text>
        <View style={styles.item}>
          <Icon name="call-outline" size={25} color={colors.primary500} />
          <Text style={styles.infoText}>{currentUser.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Güvenlik</Text>
        <TouchableOpacity style={styles.item}>
          <Icon name="shield-checkmark-outline" size={25} color={colors.primary500} />
          <Text style={styles.infoText}>Gizlilik</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="key-outline" size={25} color={colors.primary500} />
          <Text style={styles.infoText}>Hesap Güvenliği</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={25} color={colors.white} />
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
