import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Text, Dimensions, FlatList} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Carte from "./Carte";


const Activities = ({ navigation}) => {

    const [listPlaces, setListPlaces] = useState([]);
    const mapRef = useRef(null);
    const [position, setPosition] = useState(null);
    const [NE, setNE] = useState(null);
    const [SW, setSW] = useState(null);
    const [NW, setNW] = useState(null);
    const [SE, setSE] = useState(null);
    const placesList = [];

    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={item.name}
            description={item.nom}
            onPress={() => navigateToLocalisationDetails(index)}           
        />     
    );

    const navigateToLocalisationDetails = (index) => {
        navigation.navigate("ViewPlacesDetails", { index });
    };


    return(
    <Layout style={styles.container}>
            <View style={styles.carte}>
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
    placesList: state.ReducerPlaces.places;
   
};



export default connect(mapStateToProps)(Activities);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carte: {
        height: "70%",
    },
    map: {
        width: "100%",
        height: '100%',
      },
      bottom: {
        height: "30%",
    },
});