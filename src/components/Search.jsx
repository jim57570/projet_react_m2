import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon, Autocomplete, AutocompleteItem, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { cityAutoComplete, geocoding } from '../api/Here';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const distanceData = [
    5, 10, 20, 30, 40, 50
];

const Search = ({navigation, placesList, tagsList}) => {

    //resultat de la recherche
    const [searchList, setSearchList] = useState([]);
    //resultat api autocompletion ville
    const [cityList, setCityList] = useState([]);
    // Entrées de l'utilisateur
    const [search, setSearch] = useState('');
    const [city, setCity] = useState('');
    //values select components
    const [selectedIndexTags, setSelectedIndexTags] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const [selectedIndexKilometer, setSelectedIndexKilometer] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    //tab des tags selectionnes
    const tagValues = selectedIndexTags.map(index => tagsList[index.row].name);
    
    //icones
    const renderIconTags = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );
    const renderIconAddress = (props) => (
        <Icon name='pin-outline' {...props} />
    );
    const renderIconSearch = (props) => (
        <Icon name='search-outline' {...props} />
    );

    //choix autocompletion sur le champ city
    const onSelectCity = (index) => {
        setCity(cityList[index].address.label);
    };

    //lors d'une saisie sur le champ city
    const onChangeText = (query) => {
        setCity(query);
        if(query != '')
            fetchCity(query);
    };

    //appel api pour avoir liste autocompletion city
    const fetchCity = async (query) => {
        setCityList([]);
        const res = await cityAutoComplete(query);
        setCityList(res.items);
    };

    //affichage autocompletion city
    const renderAutocomplete = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.address.label}
        />
    );

    //affichage item lieu
    const renderItem = ({ item, index }) => (
        <ListItem
            title={item.loc}
            key={item.name}
            description={item.nom}
        />
    );

    //affichage tag
    const renderTags = (item, index) => (
        <SelectItem title={item.name} key={index}/>
    );

    //affichage km
    const renderDist = (item, index) => (
        <SelectItem title={item + ' km'} key={index}/>
    );

    //recherche des lieux
    const btnSearch = async () => {
        //TODO verification formulaire
        //TODO verification retour API
        
        const res = await geocoding(city);

        let filter = [];
        
        //filtre distance (si distance entre coord lieu et coord recherche < distance max)
        filter = placesList.filter(place => distance(res.items[0].position.lat, res.items[0].position.lng, place.coordonnee.latitude, place.coordonnee.longitude) <= distanceData[selectedIndexKilometer.row]);

        //filtre champ search
        if (search.length > 0) 
            filter = filter.filter(place => place.nom.toLowerCase().includes(search.toLowerCase()));

        //filtre tag (si lieux contient tags selectionnes)
        if(tagValues.length > 0)
            filter = filter.filter(place => place.tags.some(tag => tagValues.includes(tag.name)));

        setSearchList(filter);
    };

    //Calcule la distance entre 2 coord GPS
    const distance = (lat1, lon1, lat2, lon2) => {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        
        dist = dist * 1.609344; //conversion en km

        return dist;
    };

    return (
        <Layout style={styles.container}>
            <Layout style={styles.containerSearch}>
                <Input
                    placeholder='Search'
                    accessoryLeft={renderIconSearch}
                    value={search}
                    onChangeText={nextValue => setSearch(nextValue)}
                    style={styles.input}
                />
                <Select
                    placeholder='Tags'
                    multiSelect={true}
                    selectedIndex={selectedIndexTags}
                    onSelect={index => setSelectedIndexTags(index)}
                    accessoryLeft={renderIconTags}
                    value={tagValues.join(', ')}
                    style={styles.input}>
                    {tagsList.map(renderTags)}
                </Select>
                <Layout>
                    <Autocomplete
                        placeholder='City'
                        value={city}
                        onSelect={onSelectCity}
                        onChangeText={onChangeText}
                        accessoryLeft={renderIconAddress}
                        style={styles.input}>
                        {cityList.map(renderAutocomplete)}
                    </Autocomplete>
                    <Select
                        placeholder='Distance'
                        accessoryLeft={<FontAwesomeIcon icon={faTachometerAlt} />}
                        selectedIndex={selectedIndexKilometer}
                        onSelect={index => setSelectedIndexKilometer(index)}
                        value={distanceData[selectedIndexKilometer.row] + ' km'}
                        >
                        {distanceData.map(renderDist)}
                    </Select>
                </Layout>
                <Button onPress={btnSearch}>
                    Search
                </Button>
            </Layout>
            <List
                style={styles.listItems}
                data={searchList}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.ReducerPlaces.places,
        tagsList: state.tags.tags
    }
};

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerSearch: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    containerPlace: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 50
    },
    selectPlace: {
        width: "65%",
        marginRight: 20
    },
    selectKilometer: {
        width: "30%",
    },
    input: {
        paddingBottom: 10,
    }
});