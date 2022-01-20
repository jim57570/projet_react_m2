import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import Carte from "./Carte";


const Places = ({ navigation, placesList }) => {

    const [listPlaces, setListPlaces] = useState(placesList);
    const isFocused = useIsFocused();
    const mapRef = useRef(null);

    useEffect(() => {
        setListPlaces(placesList);
    }, [placesList, isFocused]);

    const buttonZoom = (item) => {
        return (

            <Layout>
                <Button
                    onPress={() => ZoomPosition(item.coordonnee)}
                    style={styles.buttonZoom}>
                    <Icon
                        style={styles.iconShare}
                        // fill='#3366FF'
                        fill='#FFFFFF'
                        name='pin'
                    />
                </Button>
            </Layout>
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
    },
    buttonZoom: {
        borderColor: 'transparent',
        // backgroundColor: 'transparent',
        height: 10,
        flex: 1,
        justifyContent: 'center',
        width: 15
    },
    iconShare: {
        backgroundColor: '#FFFF',
    }
});