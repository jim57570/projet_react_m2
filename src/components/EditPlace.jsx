import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { autoComplete, geocoding } from '../api/Here';

const EditPlace = ({ route, navigation, navigation: {goBack}, placesList, dispatch }) => {

    //state pour le formulaire
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();

    //liste d'adresses pour l'autocompletion
    const [addressData, setAddressData] = useState([]);

    const index = route.params.index;
    const [place, setPlace] = useState(placesList[index]);
    

    useEffect(() => {
        setName(place.nom);
        setDescription(place.description);
        setAddress(place.loc)
        navigation.setOptions({
            headerTitle: "Edit \"" + place.nom + "\"",
        });
    }, []); // Uniquement à l'initialisation

    //appel api pour avoir liste autocompletion adresse
    const fetchAddress = async () => {
        setAddressData([]);
        const res = await autoComplete(address);
        setAddressData(res.items);
    };

    const [selectedIndex, setSelectedIndex] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const renderIconTags = (props) => (
        <Icon name='pin-outline' {...props} />
    );
    const renderIconAddress = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );
    const renderIconText = (props) => (
        <Icon name='edit-outline' {...props} />
    );

    //lors d'une saisie sur le champ adresse
    const onChangeText = (query) => {
        setAddress(query);
        if (address != '')
            fetchAddress();
    };

    //choix autocompletion sur le champ adresse
    const onSelect = (indexSelect) => {
        setAddress(addressData[indexSelect].address.label);
    };

    //affichage autocompletion adresse
    const renderAutocomplete = (item, indexSelect) => (
        <AutocompleteItem
            key={indexSelect}
            title={item.address.label}
        />
    );

    //modifications d'un lieu
    const editPlace = async () => {
        const res = await geocoding(address);
        //TODO verification formulaire

        //constitution de notre objet Lieu
        const newPlace = {
            "nom": name,
            "loc": address,
            "coordonnee": {
                "latitude": res.items[0].position.lat,
                "longitude": res.items[0].position.lng,
                "latitudeDelta": 1,
                "longitudeDelta": 1,
            },
            "tags": [
                'Restaurant',
                'Bar'
            ],
            "description": description
        };

        const action = { type: 'UPDATE_PLACE', value: { index: index, place: newPlace }};
        dispatch(action); // dispatch est injectée par Redux dans les props du composant
        setPlace(newPlace);
        navigation.navigate("ViewPlacesDetails", { index });
        // goBack();
    };

    return (
        <Layout style={styles.container}>
            <Input
                placeholder='Name'
                accessoryLeft={renderIconText}
                value={name}
                onChangeText={nextName => setName(nextName)}
                style={styles.input}
            />
            <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder='Description'
                accessoryLeft={renderIconText}
                value={description}
                onChangeText={nextDescription => setDescription(nextDescription)}
                style={styles.input}
            />
            <Select
                placeholder='Tags'
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={indexSelect => setSelectedIndex(indexSelect)}
                style={styles.input}
                accessoryLeft={renderIconTags}>
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
            </Select>
            <Autocomplete
                placeholder='Address'
                value={address}
                onSelect={onSelect}
                onChangeText={onChangeText}
                accessoryLeft={renderIconAddress}
                style={styles.input}>
                {addressData.map(renderAutocomplete)}
            </Autocomplete>
            <Button
                title='Add place'
                onPress={editPlace}
            />

        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.ReducerPlaces.places
    }
};

export default connect(mapStateToProps)(EditPlace);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        paddingBottom: 10
    }
});