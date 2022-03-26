import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon, Text} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import Carte from "./Carte";
import i18next from 'i18next';
import * as geolib from 'geolib';


const Places = ({ navigation, placesList }) => {

    const [listPlacesAll, setListPlacesAll] = useState(placesList)

    const [listPlaces, setListPlaces] = useState([]);
    const isFocused = useIsFocused();
    const mapRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [NE, setNE] = useState(null);
    const [SW, setSW] = useState(null);
    const [NW, setNW] = useState(null);
    const [SE, setSE] = useState(null);

    useEffect(() => {
        setListPlacesAll(placesList);
    }, [placesList, isFocused]);



    useEffect(() => {
        setListPlaces([])
    
        if(SW !== null && NW !== null && NE !== null && SE !== null ){
            
        let temp = [];

        listPlacesAll.forEach((item, index) => {
            /* console.log(item.coordonnee) //value 
            console.log(index) //index */
            
            const resultat = geolib.isPointInPolygon({ latitude: item.coordonnee.latitude, longitude: item.coordonnee.longitude }, [
                { lat: SW.latitude, lng: SW.longitude }, // Sud Ouest 
                { lat: NW.latitude,  lng: NW.longitude }, // Nord ouest
                { lat: NE.latitude, lng: NE.longitude }, // Nord est               
                { lat: SE.latitude, lng: SE.longitude }, // sud est
              ])

              if(resultat){
                temp.push(item)
              }

         
        })

        setListPlaces(temp)
    }

       
    }, [NE, SW, NW, SE]);





















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
            key={item.id}
            description={item.nom}
            accessoryRight={buttonZoom(item)}
            onPress={() => navigateToLocalisationDetails(item.id)}
        />
        
    );

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place", {loc: position});
    };

    const navigateToLocalisationDetails = (index) => {
        navigation.navigate("ViewPlacesDetails", { index , loc: position});
    };

    // Zoom sur les coordonnées renseignées
    const ZoomPosition = (coord) => {
        mapRef.current.animateToRegion(coord, 1000); // Zoom dure 1000 ms
    };


   

    return (
        <Layout style={styles.container}>
            <View style={styles.carte}>
                <Button appearance='outline' style={styles.buttonAddNewPlace} onPress={navigateToAddNewPlace}>
                    {i18next.t('Add new place')}
                </Button>
                <Carte localisation={placesList} style={styles.carte} instanceMap={mapRef} setPosition={setPosition} position={position} NoEs = {setNE} NoWs = {setNW} SoWs= {setSW} SoEs = {setSE} />

            </View>

            <View style={styles.bottom}>
                <List
                    data={listPlaces}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                    extraData={listPlaces}
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