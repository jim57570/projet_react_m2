import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, List, Divider, ListItem } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Carte from "./Carte";

const Places = ({ navigation, placesList, dispatch }) => {

    const [listPlaces, setListPlaces] = useState(placesList);
    const [isRefreshing, setIsRefreshing] = useState(false);


    useEffect(() => {
        setListPlaces(placesList);
    }, [placesList]);

    const renderItem = ({ item }) => (
        <ListItem
            title={item.loc}
            description={item.nom}
            // accessoryRight={renderItemAccessory}
            onPress={() => navigateToLocalisationDetails(item)}
        />
    );

    // const refreshFavRestaurants = () => {
    //     setIsRefreshing(true);
    //     setIsError(false);
    //     let restaurants = [];
    //     try {
    //       for (const id of favRestaurants) {
    //         const zomatoSearchResult = await getRestaurantDetails(id)
    //         restaurants.push(zomatoSearchResult);
    //       };
    //       setRestaurants(restaurants);
    //     } catch (error) {
    //       setIsError(true);
    //       setRestaurants([]);
    //     }
    //     setIsRefreshing(false);
    //   };

    const navigateToAddNewPlace = () => {
        navigation.navigate("Add New Place");
    };

    const navigateToLocalisationDetails = (item) => {
        navigation.navigate("ViewPlacesDetails", { item });
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
                        data={placesList}
                        keyExtractor={(item) => item.nom.toString()}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                    />
                </View>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.places.places
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