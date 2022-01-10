import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import LocalisationListItem from "../components/LocalisationListItem";



const Carte = ({ navigation}) => {

  const localisation = [
  {
      "id" : 1,
      "nom": "tchanville",
      "loc" : "Le petit marcel",
      "coordonnee": {
        "latitude": 39.6762,
        "longitude": 45.6503,
        "latitudeDelta": 1,
        "longitudeDelta": 1,
      },
      'description' : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
  },
  {
    "id" : 2,
    "nom" : "la feuille d'or",
    "loc" : "Metz",
    "coordonnee": {
      "latitude": 45.6762,
      "longitude": 100.6503,
      "latitudeDelta": 1,
      "longitudeDelta": 1,
    },
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
},
{
  "id" : 3,
  "nom" : "le cirque zavatta",
  "loc" : "Paris",
  "coordonnee": {
    "latitude": 48.856614,
    "longitude": 2.3522219,
    "latitudeDelta": 1,
    "longitudeDelta": 1,
  },
  "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
},
  ];

  const tokyoRegion = {

    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  const navigateToLocalisationDetails = (localisationID) => {
    navigation.navigate("ViewLocalisationDetail", {localisationID});
  };


  
  
 

  return (
    <View style={styles.container}>
      <View style={styles.fenetremap}>

        <MapView style={styles.map}
          initialRegion={tokyoRegion}
        >
           <Marker coordinate={tokyoRegion} />


          {localisation.map((localisation ) => (
            <Marker
              key={localisation.id}
              coordinate={localisation.coordonnee}
              title={localisation.nom}
              description={localisation.description}
            />
          ))}
        </MapView>

        <FlatList
        data={localisation}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LocalisationListItem LocalisationData={item} onClick={navigateToLocalisationDetails}/>
        )}
        />
      </View>
    

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