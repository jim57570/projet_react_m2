import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Spinner } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';


const Carte = ({ navigation, localisation, posit, instanceMap }) => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const mapRef = instanceMap;

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      const locate = await Location.getCurrentPositionAsync({});
      setPosition(locate.coords)
    })()
  }, []);

  return (
    <View>
      {loading ?
        <Spinner /> :
        (<MapView style={styles.map}
          ref={mapRef}>


          {localisation.map((place) => (
            <Marker
              coordinate={place.coordonnee}
              title={place.nom}
              description={place.description}
            />
          ))}
          
          {position ? (
            <Marker coordinate={position} title="My location" >
              <FontAwesome name="map-marker" size={40} color="#B12A5B" />
            </Marker>
          ) :
            <Text> pas encore</Text>
          }



        </MapView>
        )}
    </View>

  )
};

export default Carte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: '100%',
  },
  fenetremap: {
    flex: 3,
  }

}); 