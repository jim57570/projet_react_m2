import React, { useState, useEffect } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import Carte from "./Carte";
import { useRef } from "react";


const Places = ({ navigation, placesList }) => {

    const [listPlaces, setListPlaces] = useState(placesList);
    const isFocused = useIsFocused();
    const mapRef = useRef(null);

    useEffect(() => {
        setListPlaces(placesList);
    }, [placesList, isFocused]);

    // Icône Zoom
    const renderIconZoom = (props) => (
        <Icon name='pin-outline' {...props} />
    );

    // Icône Zoom
    const buttonZoom = (item, index) => {
        return (

            <Layout>
                <Button
                    accessoryRight={renderIconZoom} onPress={() => ZoomPosition(item.coordonnee)}>
                </Button>
            </Layout>

        );
    };


    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={index}
            description={item.nom}
            accessoryRight={buttonZoom(item, index)}
            onPress={() => navigateToLocalisationDetails(item)}
        />
    );

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place");
    };

    const navigateToLocalisationDetails = (item, index) => {
        navigation.navigate("ViewPlacesDetails", { index });
    };

    // Zoom sur les coordonnées renseignées
    const ZoomPosition = (coord) => {
        mapRef.current.animateToRegion(coord, 1000); // Zoom dure 1000 ms
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.carte}>
                <Carte localisation={placesList} style={styles.carte} instanceMap={mapRef} />
            </View>

            <View style={styles.bottom}>
                <Button style={styles.space} onPress={navigateToAddNewPlace}>
                    Add New Place
                </Button>
                <List
                    data={listPlaces}
                    keyExtractor={(item, index) => index}
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
    }
});