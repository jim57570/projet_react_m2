import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon, Spinner } from '@ui-kitten/components';


const Carte = ({ navigation, localisation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');

  //       setPlacement({
  //         latitude: 35.6762,
  //         longitude: 139.6503,
  //         latitudeDelta: 1,
  //         longitudeDelta: 1,
  //       });

  //       setLoading(false);
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // if (errorMsg)
  // {

  // }
  // else if (location)
  // {
  //   setPlacement({
  //     latitude: location && location.coords && location.coords.latitude ? location.coords.latitude : 35.6762,
  //     longitude: location && location.coords && location.coords.longitude ? location.coords.longitude : 139.6503,
  //     latitudeDelta: 1,
  //     longitudeDelta: 1,
  //   });
  // }

  const zone = {
    latitude: 35.6762,
    longitude: 39.6503,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };



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
          initialRegion={zone}
        >
          <Marker coordinate={zone} />


          {localisation.map((localisation) => (
            <Marker
              key={localisation.id}
              coordinate={localisation.coordonnee}
              title={localisation.nom}
              description={localisation.description}
            />
          ))}
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