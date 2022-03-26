import React, { useState, useEffect } from 'react';
import {
    Layout,
    Input,
    Button,
    IndexPath,
    Select,
    SelectItem,
    Icon,
    Autocomplete,
    AutocompleteItem,
    Text, List, ListItem
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { autoComplete, autoCompleteLoc, geocoding } from '../api/Here';
import {TouchableOpacity} from "react-native-gesture-handler";
import Toast from 'react-native-root-toast';
import i18next from 'i18next';



const EditPlace = ({ route, navigation, navigation: { goBack }, placesList, dispatch }) => {

    // State pour le formulaire
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [tags, SetTags] = useState([]);

    const [nameInput, setNameInput] = useState('basic');
    const [descInput, setDescInput] = useState('basic');
    const [addrInput, setAddrInput] = useState('basic');



    // Liste d'adresses pour l'autocompletion
    const [addressData, setAddressData] = useState([]);

    // Index de la place
    const [index, setIndex] = useState(route.params.index);

    //localisation pour autocomplete address
    const position = route.params?.loc;

    // Place
    const [place, setPlace] = useState(placesList.find(place => place.id === index));


    useEffect(() => {
        setName(place.nom);
        setDescription(place.description);
        setAddress(place.loc);
        SetTags(place.tags)
        navigation.setOptions({
            headerTitle: i18next.t('Edit') + " \"" + place.nom + "\"",
        });
    }, []);

    //liste des tags de la page Tags
    useEffect(() => {
        if(route.params?.list) {
            SetTags(route.params.list);
        }
    }, [route.params?.list])

    // Appel api pour avoir liste autocompletion adresse
    const fetchAddress = async () => {
        setAddressData([]);
        let res = [];
        if(position == null)
            res = await autoComplete(address);
        else
            res = await autoCompleteLoc(address, position.coords.latitude, position.coords.longitude);
        setAddressData(res.items);
    };

    const [selectedIndex, setSelectedIndex] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);

    // Icône Tags
    const renderIconTags = (props) => (
        <Icon name='pin-outline' {...props} />
    );

    // Icône Address
    const renderIconAddress = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );

    // Icône Text
    const renderIconText = (props) => (
        <Icon name='edit-outline' {...props} />
    );

    // Lors d'une saisie sur le champ adresse
    const onChangeText = (query) => {
        setAddress(query);
        if (address != '')
            fetchAddress();
    };

    // Choix autocompletion sur le champ adresse
    const onSelect = (indexSelect) => {
        setAddress(addressData[indexSelect].address.label);
    };

    // Affichage autocompletion adresse
    const renderAutocomplete = (item, indexSelect) => (
        <AutocompleteItem
            key={indexSelect}
            title={item.address.label}
        />
    );

    //verification du formulaire
    const verifForm = async () => {
        let valid = true;

        const res = await geocoding(address); //on verifie si l adresse existe bien

        if(name.trim().length == 0) {
            setNameInput('danger');
            valid = false;
            Toast.show('Form incomplete !', {
                duration: Toast.durations.SHORT,
            });
        }
        if(address.trim().length == 0) {
            setAddrInput('danger');
            valid = false;
            Toast.show('Form incomplete !', {
                duration: Toast.durations.SHORT,
            });
        }
        else if(res.items.length == 0) {
            setAddrInput('danger');
            valid = false;
            Toast.show('Address doesnt exist !', {
                duration: Toast.durations.SHORT,
            });
        }
        return valid;
    };

    // Modifications d'un lieu
    const editPlace = async () => {
        const check = await verifForm();
        
        if(check) {
            const res = await geocoding(address);
            //TODO verification formulaire

            //constitution de notre objet Lieu
            const newPlace = {
                "id": place.id,
                "nom": name,
                "loc": address,
                "coordonnee": {
                    "latitude": res.items[0].position.lat,
                    "longitude": res.items[0].position.lng,
                    "latitudeDelta": 1,
                    "longitudeDelta": 1,
                },
                "tags": tags,
                "description": description
            };
            const action = {type: 'UPDATE_PLACE', value: {place: newPlace}};
            dispatch(action);
            setPlace(newPlace);
            navigation.navigate("ViewPlacesDetails", {index});
        }
    };

    //affichage des tags
    const renderTags = ({item, index}) => (
        <ListItem
            key={index}
            title={item.name}
        />
    );

    return (
        <Layout style={styles.container}>
            <Input
                placeholder={i18next.t('Name')}
                accessoryLeft={renderIconText}
                value={name}
                onChangeText={nextName => setName(nextName)}
                style={styles.input}
                status={nameInput}
            />
            <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder={i18next.t('Description')}
                accessoryLeft={renderIconText}
                value={description}
                onChangeText={nextDescription => setDescription(nextDescription)}
                style={styles.input}
                status={descInput}
            />
            <Autocomplete
                placeholder={i18next.t('Address form')}
                value={address}
                onSelect={onSelect}
                onChangeText={onChangeText}
                accessoryLeft={renderIconAddress}
                style={styles.input}
                status={addrInput}>
                {addressData.map(renderAutocomplete)}
            </Autocomplete>
            <TouchableOpacity style={styles.tagList} onPress={() => {navigation.navigate("Tags", {list: tags, path: "Edit Place"})}}>
                <Button status="basic">
                    Tags : {tags.length == 0
                    ?<Text style={styles.text}>{i18next.t('TagEmpty')}</Text>
                    :null
                }
                </Button>
                {tags.length == 0
                    ? null
                    :<List
                        accessoryLeft={renderIconTags}
                        data={tags}
                        renderItem={renderTags}
                    />
                }
            </TouchableOpacity>
            <Button onPress={editPlace}>
                {i18next.t('Edit')}
            </Button>

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
    },
    tagList: {
        flexDirection: 'row',
        paddingBottom: 10
    }
});