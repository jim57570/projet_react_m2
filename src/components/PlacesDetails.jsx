import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, List, Divider, ListItem, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Share, Linking } from 'react-native';
import { connect } from 'react-redux';

const PlacesDetails = ({ navigation, route, placesList, dispatch }) => {

  const index = route.params.index;
  const [place, setPlace] = useState(placesList[index]);

  useEffect(() => {
    console.log("placesList details: ")
    console.log(placesList)
    setPlace(placesList[index]);
  }, [placesList]);


  useEffect(() => {
    navigation.setOptions({
      headerTitle: place.nom,
      headerRight: () => (
        <Button
          style={styles.buttonShare}
          onPress={sharePlace}>
          <Icon
            style={styles.iconShare}
            fill='#3366FF'
            name='share-outline'
          />
        </Button>
      )
    });
  }, []); // Uniquement à l'initialisation

  const renderIconTrash = (props) => (
    <Icon name='trash-2-outline' {...props} />
  );

  const renderIconEdit = (props) => (
    <Icon name='edit' {...props} />
  );

  const renderIconMap = (props) => (
    <Icon name='map' {...props} />
  );

  const navigateToPlaces = () => {
    navigation.navigate("Places");
  };

  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${place.coordonnee.latitude},${place.coordonnee.longitude}`;
    const label = `${place.nom}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  const sharePlace = async () => {
    try {
      await Share.share({
        message:
          'Regarde cet endroit \nNom: ' + place.nom + '\n' + place.description + '\n\n' + place.loc + '\n\nCoordonnées: \n   Lattitude: ' + place.coordonnee.latitude + '\n   Longitude: ' + place.coordonnee.longitude,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  //suppression d'un lieu
  const deletePlace = async () => {
    const action = { type: 'DELETE_PLACE', value: place };
    dispatch(action); // dispatch est injectée par Redux dans les props du composant
    navigation.navigate("Places");
  };

  //modifications d'un lieu
  const editPlace = () => {
    navigation.navigate("Edit Place", { index });
    // const action = { type: 'UPDATE_PLACE', value: place };
    // dispatch(action); // dispatch est injectée par Redux dans les props du composant
  };


  return (
    <Layout style={styles.container}>
      <Text>
        {place.description}
      </Text>
      <Layout style={styles.containerTags}>

      </Layout>
      <Layout style={styles.containerAdress}>
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='pin-outline'
        />
        <Text>
          {place.loc}
        </Text>
      </Layout>
      <Layout style={styles.containerButton}>
        <Button
          style={styles.buttonEditDelete}
          status='success'
          accessoryRight={renderIconEdit}
          onPress={editPlace}>
          Edit
        </Button>
        <Button
          style={styles.buttonEditDelete}
          status='danger'
          accessoryRight={renderIconTrash}
          onPress={deletePlace}>
          Delete
        </Button>
      </Layout>
      <Button
        accessoryRight={renderIconMap}
        onPress={openMap}>
        Open in Map
      </Button>
    </Layout>
  )
};

const mapStateToProps = (state) => {
  return {
    placesList: state.ReducerPlaces.places
  }
};

export default connect(mapStateToProps)(PlacesDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerAdress: {
    flex: 2,
    flexDirection: "row",
  },
  containerTags: {
    flex: 5,
    flexDirection: "row",
  },
  containerButton: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonEditDelete: {
    height: 50,
    paddingHorizontal: 40
  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonShare: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    paddingRight: 30
  }
});