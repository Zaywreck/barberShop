import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../../context/AppContext';

const InfoWidget = () => {
  const { shopInfo } = useContext(AppContext);
  const navigation = useNavigation();
  const [showInfo, setShowInfo] = useState(false);

  const handleAddressPress = () => {
    navigation.navigate('Map', { address: shopInfo?.address });
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleInfo} style={styles.header}>
        <Text style={styles.headerText}>{showInfo ? 'Küçült' : 'Detaylı Bilgi'}</Text>
        <Icon name={showInfo ? 'chevron-up' : 'chevron-down'} size={20} color={colors.gold} />
      </TouchableOpacity>
      {showInfo && shopInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="user" size={20} color={colors.gold} style={styles.icon} />
            <Text style={styles.text}>{shopInfo.name}</Text>
          </View>
          <TouchableOpacity onPress={handleAddressPress} style={styles.infoRow}>
            <Icon name="map-marker" size={20} color={colors.gold} style={styles.icon} />
            <Text style={styles.text}>{shopInfo.address}</Text>
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color={colors.gold} style={styles.icon} />
            <Text style={styles.text}>{shopInfo.phone}</Text>
          </View>
          <View style={styles.hoursRow}>
            <Icon name="clock-o" size={20} color={colors.gold} style={styles.icon} />
            <Text style={styles.text}>Açılış: {shopInfo.workingHours.open} | </Text>
            <Text style={styles.text}>Kapanış: {shopInfo.workingHours.close} </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary500,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary400,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerText: {
    color: colors.gold,
    fontSize: 16,
    paddingRight: 5,
  },
  infoContainer: {
    backgroundColor: colors.primary400,
    borderRadius: 8,
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.black,
    paddingTop: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.gold,
    fontSize: 16,
  },
});

export default InfoWidget;
