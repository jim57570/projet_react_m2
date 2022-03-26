import React, { useState, useEffect } from 'react';
import {Layout, Text, Button, Icon, Divider, useTheme, List, ListItem} from '@ui-kitten/components';
import { StyleSheet, Share, Linking, View } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileAlt, faTags, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { useIsFocused } from "@react-navigation/native"; // https://stackoverflow.com/questions/60182942/useeffect-not-called-in-react-native-when-back-to-screen

const PlacesDetails = ({ navigation, route, placesList, dispatch }) => {

  const index = route.params.index;
  const position = route.params?.loc;
  const [place, setPlace] = useState(placesList.find(place => place.id === index));
  const isFocused = useIsFocused();
  const theme = useTheme();

  const [tags, SetTags] = useState([]);

  useEffect(() => {
    SetTags(placesList.find(place => place.id === index)?.tags);
    setPlace(placesList.find(place => place.id === index));
    navigation.setOptions({
      headerTitle: placesList.find(place => place.id === index)?.nom,
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
  }, [isFocused]);

  // Icône Trash
  const renderIconTrash = (props) => (
    <Icon name='trash-2-outline' {...props} />
  );

  // Icône Edit
  const renderIconEdit = (props) => (
    <Icon name='edit' {...props} />
  );

  // Icône Map
  const renderIconMap = (props) => (
    <Icon name='map' {...props} />
  );

  // Ouvre l'application map par défaut du mobile en fonction des coordonnées GPS du lieu
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

  // Partage les informations du lieu
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

  // suppression d'un lieu
  const deletePlace = async () => {
    const action = { type: 'DELETE_PLACE', value: place.id };
    dispatch(action);
    navigation.navigate("Places");
  };

  // modifications d'un lieu
  const editPlace = () => {
    navigation.navigate("Edit Place", { index , loc: position});
  };

  //affichage des tags
  const renderTags = ({item, index}) => (
      <ListItem
          key={index}
          title={item.name}
      />
  );

  // Icône Tags
  const renderIconTags = (props) => (
      <Icon name='pin-outline' {...props} />
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInfos}>
        <Layout style={styles.layout2Container} level='2'>
          <Layout style={styles.viewTitle} level='2'>
            <Text style={styles.title}>
              DESCRIPTION
            </Text>
            <FontAwesomeIcon icon={faFileAlt} size={15} color={theme['text-basic-color']} paddingVertical={25} />
          </Layout>
          <Divider />
          <Text style={styles.text}>
            {place?.description}
          </Text>
        </Layout>

        <Layout style={styles.layout2Container} level='2'>
          <Layout style={styles.viewTitle} level='2'>
            <Text style={styles.title}>
              TAGS
            </Text>
            <FontAwesomeIcon icon={faTags} size={20} color={theme['text-basic-color']} paddingVertical={25} />
          </Layout>
          <Divider />
          {tags?.length == 0
              ? <Text style={styles.text}>Empty</Text>
              :<List
                  accessoryLeft={renderIconTags}
                  data={tags}
                  renderItem={renderTags}
              />
          }
        </Layout>

        <Layout style={styles.layout2Container} level='2'>
          <Layout style={styles.viewTitle} level='2'>
            <Text style={styles.title}>
              ADDRESS
            </Text>
            <FontAwesomeIcon icon={faMapMarkedAlt} size={20} color={theme['text-basic-color']} paddingVertical={25} />
          </Layout>
          <Divider />
          <Text style={styles.text}>
            {place?.loc}
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.containerButton}>
        <Layout style={styles.containerButtonEditDelete}>
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
    alignContent: 'space-between',
  },
  containerInfos: {
    flex: 1,
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
    flex: 1,
    alignContent: "flex-end",
    maxHeight: 120,
    minHeight: 120
  },
  containerButtonEditDelete: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonEditDelete: {
    height: 50,
    width: "40%",
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
  },
  title: {
    fontSize: 20,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  text: {
    padding: 20,
  },
  layout2Container: {
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    minHeight: 110,
    height: 'auto'
  },
  viewTitle: {
    flex: 2,
    flexDirection: 'row',
    alignContent: "center",
    borderRadius: 10,
    maxHeight: 50,
    minHeight: 50,
  },
});