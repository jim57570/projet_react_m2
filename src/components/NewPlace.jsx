import React, { useEffect, useState } from 'react';
import { Layout, Text, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem, List, ListItem } from '@ui-kitten/components';
import { StyleSheet, View} from 'react-native';
import Toast from 'react-native-root-toast';

import { connect } from 'react-redux';
import { autoComplete, geocoding } from '../api/Here';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewPlace = ({ placesList, dispatch, navigation, route }) => {

    useEffect(() => {
        if(route.params?.list) {
            //console.log(route.params.list);
            SetTags(route.params.list);
        }
    }, [route.params?.list])
    
    //state pour le formulaire
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const oui = true;

    //liste des tags selectionnes
    const [tags, SetTags] = useState([]);

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

    // Icône Tags
    const renderIconTags = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );

    // Icône Address
    const renderIconAddress = (props) => (
        <Icon name='pin-outline' {...props} />
    );

    // Icône Text
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

    //DEBUG ONLY
    const resetPlace = () => {
        const action = {type: 'RESET_PLACE'};
        dispatch(action);
    }

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
            "description": description,
            "tags": tags
        };
        const action = {type: 'ADD_PLACE', value: newPlace};
        dispatch(action);

        let toast = Toast.show('Place saved !', {
            duration: Toast.durations.LONG,
        });

        navigation.navigate("Places");
    };

    const renderTags = ({item, index}) => (
        <ListItem
            key={index}
            title={item.name}
        />
    );

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
            <TouchableOpacity style={styles.tagList} onPress={() => {navigation.navigate("Tags", {list: tags})}}>
                <Text>
                    Tags :
                </Text>
                {tags.length == 0 
                    ?<Text>Empty (click here to add)</Text>
                    :<List
                    accessoryLeft={renderIconTags}
                    data={tags}
                    renderItem={renderTags}
                    />
                }
            </TouchableOpacity>
            <Autocomplete
                placeholder='Address'
                value={address}
                onSelect={onSelect}
                onChangeText={onChangeText}
                accessoryLeft={renderIconAddress}
                style={styles.input}>
                {addressData.map(renderAutocomplete)}
            </Autocomplete>
            <Button onPress={addPlace}>
                Add place
            </Button>
            <Button onPress={resetPlace}>
                reset list places
            </Button>

        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.ReducerPlaces.places
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
    },
    tagList: {
        flexDirection: 'row'
    }
});