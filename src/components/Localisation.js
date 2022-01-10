import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

/* import { getRestaurantDetails } from '../api/zomato'; */

const Localisation = ({route}) => {

  const [localisation, setLocalisation] = useState(null);

  useEffect(() => {
    console.log(route)
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
    <View style={styles.container}>
      { <Text>
           Je suis la localisation {route.params.localisationID}
      </Text> }
    </View>
  )
};

export default Localisation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});