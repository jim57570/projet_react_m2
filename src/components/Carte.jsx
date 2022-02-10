import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Spinner } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';




const Carte = ({ navigation, localisation, setPosition, position ,instanceMap, NoEs, NoWs, SoWs, SoEs }) => {
  const [loading, setLoading] = useState(false);
  const mapRef = instanceMap;
  bounds = null;
  



  const getBounds = (bounds) => {

     nordEst = {
      latitude: bounds.northEast.latitude,
      longitude: bounds.northEast.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,

    };

    sudOuest = {
      latitude: bounds.southWest.latitude,
      longitude: bounds.southWest.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,

    };

    nordOuest = {
      latitude: bounds.southWest.latitude,
      longitude: bounds.northEast.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,

    };

    sudEst = {
      latitude: bounds.northEast.latitude,
      longitude: bounds.southWest.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1,

    };
  
    NoEs(nordEst);
    SoWs(sudOuest);
    NoWs(nordOuest);
    SoEs(sudEst); 

/*     const resultat = geolib.isPointInPolygon({ latitude: position.latitude, longitude: position.longitude }, [
      { lat: southWest.latitude, lng: southWest.longitude }, // Sud Ouest 
      { lat: northWest.latitude,  lng: northWest.longitude }, // Nord ouest
      { lat: northEast.latitude, lng: northEast.longitude }, // Nord est               
      { lat: southEast.latitude, lng: southEast.longitude }, // sud est
    ]) */

    /* console.log(resultat) */
  
};





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
          ref={mapRef}
          onRegionChange={
            async () => {
              bounds = null;
              bounds = await mapRef.current.getMapBoundaries();   
              if(bounds != null){getBounds(bounds)} 
             }          
          }
         >


          
          {localisation.map((place) => (
            <Marker
              key={place.nom}
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
            <Text> </Text>
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