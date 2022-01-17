import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, List, Divider, ListItem, Icon, Input } from '@ui-kitten/components';
import { StyleSheet, Share, Linking } from 'react-native';

const PlacesDetails = ({ navigation, route }) => {
  const [place, setPlace] = useState(route.params.item);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.item.nom,
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
    setPlace(route.params.item);
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

  const deletePlace = () => {

  };

  const modifyPlace = () => {

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
      const result = await Share.share({
        message:
          'Regarde cet endroit \nNom: ' + place.nom + '\n' + place.description + '\n\n' + place.loc + '\n\nCoordonnées: \n   Lattitude: ' + place.coordonnee.latitude + '\n   Longitude: ' + place.coordonnee.longitude,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
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
          onPress={modifyPlace}>
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

export default PlacesDetails;

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