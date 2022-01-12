import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
// import GetLocation from 'react-native-get-location'
import * as Location from 'expo-location';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';


const Carte = ({ navigation, localisation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placement, setPlacement] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text);
  }

  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };



  const navigateToLocalisationDetails = (localisationID) => {
    navigation.navigate("ViewLocalisationDetail", { localisationID });
  };

  const navigateToAddNewPlace = () => {
    navigation.navigate("Add New Place");
  };

  return (

    <MapView style={styles.map}
      initialRegion={tokyoRegion}
    >
      <Marker coordinate={tokyoRegion} />


      {localisation.map((localisation) => (
        <Marker
          key={localisation.id}
          coordinate={localisation.coordonnee}
          title={localisation.nom}
          description={localisation.description}
        />
      ))}
      <Text>{text}</Text>
    </MapView>
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