import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, List, Divider, ListItem } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const PlacesDetails = ({route}) => {
  const [place, setPlace] = useState(route.params.item);
  

  useEffect(() => {
    console.log(route.params.item);
    setPlace(route.params.item);
  }, []); // Uniquement à l'initialisation

/*

  const requestRestaurant = async () => {
      const zomatoRestaurantResult = await getRestaurantDetails(route.params.restaurantID);
      //console.log(route.params.restaurantID)
      console.log("test : "+zomatoRestaurantResult)
      //setRestaurant(zomatoRestaurantResult);
      console.log(restaurant)
  } */


  return (
    <Layout style={styles.container}>
      <Text>
           {place.nom}
      </Text>
      <Text>
           {place.description}
      </Text>
    </Layout>
  )
};

export default PlacesDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});