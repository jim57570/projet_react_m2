import React, { useState } from 'react';
import { Layout, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import Assets from '../definitions/Assets';

import { connect } from 'react-redux';
import { autoComplete, geocoding } from '../api/Here';

const NewPlace = ({ placesList, dispatch }) => {

    //state pour le formulaire
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    //liste d'adresses pour l'autocompletion
    const [addressData, setAddressData] = useState([]);

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
        if(address != '')
            fetchAddress();
    };

    //choix autocompletion sur le champ adresse
    const onSelect = (index) => {
        setAddress(addressData[index].address.label);
    };

    //affichage autocompletion adresse
    const renderAutocomplete = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.address.label}
        />
    );
    
    //enregistrement d'un lieu
    const addPlace = async () => {
        //TODO verification formulaire
        //TODO verification retour API
        const res = await geocoding(address);

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
            "description": description
        };
        const action = {type: 'ADD_PLACE', value: newPlace};
        dispatch(action); // dispatch est injectée par Redux dans les props du composant

        //console.log(placesList);
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
                onSelect={index => setSelectedIndex(index)}
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
                onPress={addPlace}
            />

        </Layout>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        placesList: state.places
    }
}

export default connect(mapStateToProps)(NewPlace);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        paddingBottom: 10
    }
});