import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon, Spinner } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from "react";


const Carte = ({ navigation, localisation, posit}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);
  const mapRef = useRef(null);
  console.log(posit);

  function ZoomPosition(coord) {
    mapRef.current.animateToRegion(coord, 3 * 1000);
  };


  React.useEffect(() => {
    (async () =>{
        let { status } = await Location.requestPermissionsAsync();
        if(status !== 'granted'){
            setError('Permission to access location was denied');
            return;
        }
        const locate = await Location.getCurrentPositionAsync({});
        setPosition(locate.coords)
    })()
}, []);



const tokyoRegion = {
  latitude: 49.5,
  longitude: 5.5,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}; 



useEffect(() => {

}, []);



  const navigateToLocalisationDetails = (item) => {
    navigation.navigate("ViewPlacesDetails", { item });
  };

  const navigateToAddNewPlace = () => {
    navigation.navigate("Add New Place");
  };

  return (
      <View>
    {loading ?
      <Spinner /> :
      (<MapView style={styles.map} 
        ref={mapRef}>


        {localisation.map((localisation) => (
          <Marker
            coordinate={localisation.coordonnee}
            title={localisation.nom}
            description={localisation.description}
          />
        ))}


              {position ? (
                    <Marker coordinate={position} title="My location" >
                        <FontAwesome name="map-marker" size={40} color="#B12A5B" />
                    </Marker>
                ):
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
    width: Dimensions.get('window').width,
    height: 500,
  },
  fenetremap: {
    flex: 3,
  }

}); 