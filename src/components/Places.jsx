import React, { useState } from 'react';
import { Layout, Text, Button, List, Divider, ListItem } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Carte from "./Carte";

const Places = ({ navigation, testVariable, dispatch }) => {

    const localisation = [
        {
            "id": 1,
            "nom": "tchanville",
            "loc": "Le petit marcel",
            "coordonnee": {
                "latitude": 39.6762,
                "longitude": 45.6503,
                "latitudeDelta": 1,
                "longitudeDelta": 1,
            },
            'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
        },
        {
            "id": 2,
            "nom": "la feuille d'or",
            "loc": "Metz",
            "coordonnee": {
                "latitude": 45.6762,
                "longitude": 100.6503,
                "latitudeDelta": 1,
                "longitudeDelta": 1,
            },
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
        },
        {
            "id": 3,
            "nom": "le cirque zavatta",
            "loc": "Paris",
            "coordonnee": {
                "latitude": 48.856614,
                "longitude": 2.3522219,
                "latitudeDelta": 1,
                "longitudeDelta": 1,
            },
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod hendrerit felis. Donec sed consequat tortor. Nam a nisi semper, gravida orci nec, cursus ex. Duis id laoreet neque. Vivamus ut volutpat neque, sit amet condimentum neque. Vestibulum ut iaculis sapien. Nunc facilisis faucibus nisi in accumsan. Phasellus a quam non risus sollicitudin tempus. Ut dapibus quam nunc, eget congue dui tincidunt sed. Sed tempus risus sit amet urna auctor venenatis. Mauris et odio at mi lacinia elementum eget nec lectus. Maecenas ipsum mi, elementum quis egestas quis, feugiat eu nibh. Donec vel urna vel ipsum sagittis tincidunt. Mauris vehicula scelerisque tortor, id auctor ligula pharetra a. Duis tristique nulla turpis, id molestie massa vehicula vel. "
        },
    ];

    const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.loc} ${index + 1}`}
            description={`${item.nom} ${index + 1}`}
            // accessoryRight={renderItemAccessory}
            onPress={item => navigateToLocalisationDetails(item.id)}
        />
    );

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place");
    };

    const navigateToLocalisationDetails = (item) => {
        navigation.navigate("ViewPlacesDetails", { item });
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.fenetremap}>
                <Carte localisation={localisation} style={styles.carte}/>
                <Button style={styles.space} onPress={navigateToAddNewPlace}>
                    Add New Place
                </Button>
                <List
                    data={localisation}
                    // keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            </View>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        testVariable: state.testVariable
    }
}

export default connect(mapStateToProps)(Places);

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
    carte: {
        height: "70%",
    }
});