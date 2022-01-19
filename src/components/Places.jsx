import React, { useState, useEffect } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import Carte from "./Carte";

const Places = ({ navigation, placesList }) => {

    const [listPlaces, setListPlaces] = useState(placesList);
    const isFocused = useIsFocused();

    useEffect(() => {
        setListPlaces(placesList);
    }, [placesList, isFocused]);

    // Icône Zoom
    const renderIconZoom = (props) => (
        <Icon name='pin-outline' {...props} />
    );

    // Icône Zoom
    const buttonZoom = (props) => {
        return (
            <Layout>
                <Button
                    accessoryRight={renderIconZoom}>
                </Button>
            </Layout>

        );
    };

    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={index}
            description={item.nom}
            accessoryRight={buttonZoom}
            onPress={() => navigateToLocalisationDetails(item, index)}
        />
    );

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place");
    };

    const navigateToLocalisationDetails = (item, index) => {
        navigation.navigate("ViewPlacesDetails", { index });
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.carte}>
                {/* <Carte localisation={placesList} style={styles.carte} /> */}
            </View>

            <View style={styles.bottom}>
                <Button style={styles.space} onPress={navigateToAddNewPlace}>
                    Add New Place
                </Button>
                <List
                    data={listPlaces}
                    // keyExtractor={(item) => item.index.toString()}
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