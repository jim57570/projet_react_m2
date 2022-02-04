import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import * as Location from 'expo-location';
import Carte from "./Carte";


const Places = ({ navigation, placesList }) => {

    const [listPlaces, setListPlaces] = useState(placesList);
    const isFocused = useIsFocused();
    const mapRef = useRef(null);
    const [position, setPosition] = useState(null);


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

    useEffect(() => {
        setListPlaces(placesList);
    }, [placesList, isFocused]);

    // Icon search
    const SearchIcon = (props) => (
        <Icon {...props} name='pin' />
    );

    // Icon Glass Cheers
    const GlassCheersIcon = (props) => {
        return (
            <FontAwesomeIcon icon={faSearchPlus} style={props.style} color={props.style.tintColor} />
        )
    };

    const buttonZoom = (item) => {
        return (
            <Button
                onPress={() => ZoomPosition(item.coordonnee)}
                appearance='outline'
                accessoryLeft={GlassCheersIcon}>
            </Button>
        );
    };


    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={item.name}
            description={item.nom}
            accessoryRight={buttonZoom(item)}
            onPress={() => navigateToLocalisationDetails(index)}
        />
        
    );

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place");
    };

    const navigateToLocalisationDetails = (index) => {
        navigation.navigate("ViewPlacesDetails", { index });
    };

    // Zoom sur les coordonnées renseignées
    const ZoomPosition = (coord) => {
        mapRef.current.animateToRegion(coord, 1000); // Zoom dure 1000 ms
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.carte}>
                <Button appearance='outline' style={styles.buttonAddNewPlace} onPress={navigateToAddNewPlace}>
                    Add New Place
                </Button>
                <Carte localisation={placesList} style={styles.carte} instanceMap={mapRef} pos_actu={position} />

            </View>

            <View style={styles.bottom}>
                <List
                    data={listPlaces}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            </View>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.ReducerPlaces.places
    }
};

export default connect(mapStateToProps)(Places);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subcontainer: {
        flex: 1,
    },
    carte: {
        height: "70%",
    },
    bottom: {
        height: "30%",
    },
    iconShare: {
        backgroundColor: '#FFFF',
    },
    buttonAddNewPlace: {
        flex: 1,
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 2,
        marginTop: 50,
        marginRight: 20,
        right: "1%"
    }
});