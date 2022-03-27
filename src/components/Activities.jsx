import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon, Select, IndexPath, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet, Dimensions, FlatList, View} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Carte from "./Carte";
import HereCategories from '../definitions/HereCategories';
import { browse } from '../api/Here';
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import i18next from 'i18next';



const Activities = ({ navigation, placesList}) => {

    
    const [listPlaces, setListPlaces] = useState([]);
    const mapRef = useRef(null);
    const isFocused = useIsFocused();
    const [position, setPosition] = useState(null);
    const [NE, setNE] = useState(null);
    const [SW, setSW] = useState(null);
    const [NW, setNW] = useState(null);
    const [SE, setSE] = useState(null);
    const [localisation, setLocation] = useState([]);
    
    useEffect(() => {
        if(position != null) {
            setLocation([]);
            const newList = [...placesList];
            console.log(newList);
            newList.push({"nom": "localisation",
            "coordonnee": {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude,
                "latitudeDelta": 1,
                "longitudeDelta": 1,
            }});
            setLocation(newList);
        }
    }, [position, placesList, isFocused]);

    //component select
    const [selectedCategory, setSelectedCategory] = React.useState(new IndexPath(0));
    const [selectedLoc, setSelectedLoc] = React.useState(new IndexPath(0));

    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={item.id}
            description={item.nom}
            accessoryRight={buttonZoom(item)}
        />     
    );

    const buttonZoom = (item) => {
        return (
            <Button
                onPress={() => ZoomPosition(item.coordonnee)}
                appearance='outline'
                accessoryLeft={GlassCheersIcon}>
            </Button>
        );
    };

    // Zoom sur les coordonnées renseignées
    const ZoomPosition = (coord) => {
        mapRef.current.animateToRegion(coord, 1000); // Zoom dure 1000 ms
    };

    // Icon Glass Cheers
    const GlassCheersIcon = (props) => {
        return (
            <FontAwesomeIcon icon={faSearchPlus} style={props.style} color={props.style.tintColor} />
        )
    };

    const navigateToLocalisationDetails = (index) => {
        navigation.navigate("ViewPlacesDetails", { index });
    };

    //recherche activities
    const btnSearch = async () => {
        //TODO verification retour API
        console.log(localisation[selectedLoc.row]);
        setListPlaces([]);
        const newList = [];
        const res = await browse(HereCategories[selectedCategory.row].id, localisation[selectedLoc.row].coordonnee.latitude, localisation[selectedLoc.row].coordonnee.longitude);
        //console.log(res);
        res.items.map((item) => {
            newList.push({
                "id": item.id,
                "nom": item.title,
                "loc": "",
                "coordonnee": {
                    "latitude": item.position.lat,
                    "longitude": item.position.lng,
                    "latitudeDelta": 1,
                    "longitudeDelta": 1,
                },
                "description": "",
                "tags": []
            })
        });
        setListPlaces(newList);
    };

    //affichage categorie
    const renderCategory = (item, index) => (
        <SelectItem title={item.name_en} key={index} /> 
    );
    //affichage lieux
    const renderLoc = (item, index) => (
        <SelectItem title={item.nom} key={index} />
    );


    return(
    <Layout style={styles.container}>
            <View style={styles.carte}>
                <Carte localisation={listPlaces} style={styles.carte} instanceMap={mapRef} setPosition={setPosition} position={position} NoEs = {setNE} NoWs = {setNW} SoWs= {setSW} SoEs = {setSE} />
            </View>

            <View style={styles.bottom}>
                <View style={styles.info}>
                    <View style={styles.select}>
                        <Text style={styles.label} category='h5'>{i18next.t('Location choice')}</Text>
                        <Select
                            selectedIndex={selectedLoc}
                            onSelect={index => setSelectedLoc(index)}
                            value={localisation[selectedLoc.row]?.nom}
                            >
                            {localisation.map(renderLoc)}
                        </Select>
                    </View>
                    <View style={styles.select}>
                        <Text style={styles.label} category='h5'>{i18next.t('Category')}</Text>
                        <Select
                            selectedIndex={selectedCategory}
                            onSelect={index => setSelectedCategory(index)}
                            value={HereCategories[selectedCategory.row].name_en}
                            >
                            {HereCategories.map(renderCategory)}
                        </Select>
                    </View>
                </View>
                <Button onPress={btnSearch}>
                    {i18next.t('Search')}
                </Button>
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



export default connect(mapStateToProps)(Activities);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carte: {
        height: "50%",
    },
    map: {
        width: "100%",
        height: '100%',
      },
      bottom: {
        height: "100%",
    },
    info: {
        flexDirection: 'row'
    },
    select: {
        flex: 1
    },
    label: {
        textAlign: 'center'
    }
});