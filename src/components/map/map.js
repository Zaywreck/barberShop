import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import location from '../../constants/location';
import { MaterialIcons } from '@expo/vector-icons';
import AppContext from '../../context/AppContext';

const MapScreen = ({ route }) => {
  const { address } = route.params;
  const { location } = useContext(AppContext); 

  const { latitude, longitude } = location || {};
  const { latitudeDelta, longitudeDelta } = location || {};  

  const mapViewRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: latitudeDelta * 0.15,
    longitudeDelta: longitudeDelta * 0.15,
  });

  useEffect(() => {
    mapViewRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta * 3,
      longitudeDelta: longitudeDelta * 3,
    }, 1000);
  }, [latitude, longitude, latitudeDelta, longitudeDelta]);

  const handleRecenter = () => {
    mapViewRef.current?.animateToRegion(mapRegion, 1000);
  };

  const handleGetDirections = () => {
    const destination = `${latitude},${longitude}`;
    const platformUrl = Platform.select({
      ios: `http://maps.apple.com/?daddr=${destination}`,
      android: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    });
    Linking.openURL(platformUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapHeader}>
        <View style={styles.headerText}>
          <Text>Address: {address}</Text>
        </View>
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={handleRecenter} style={styles.button}>
            <MaterialIcons name="my-location" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGetDirections} style={styles.button}>
            <Text style={styles.buttonText}>Yol Tarifi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.map}>
        <MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          initialRegion={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
          zoomEnabled={true}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="Barber Shop"
            description={address}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  headerText: {
    flex: 1,
  },
  headerButton: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
