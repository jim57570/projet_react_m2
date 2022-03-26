import React, { useEffect, useState } from 'react';
import { Layout, Text, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem, List, ListItem } from '@ui-kitten/components';
import { StyleSheet, View} from 'react-native';
import Toast from 'react-native-root-toast';

import { connect } from 'react-redux';
import { autoComplete, autoCompleteLoc, geocoding } from '../api/Here';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';


const NewPlace = ({ placesList, dispatch, navigation, route }) => {
    
    //style du formulaire
    const [nameInput, setNameInput] = useState('basic');
    const [descInput, setDescInput] = useState('basic');
    const [addrInput, setAddrInput] = useState('basic');
    
    //liste des tags de la page Tags
    //localisation de la page Places
    useEffect(() => {
        if(route.params?.list) 
            SetTags(route.params.list);
    }, [route.params?.list])
    
    //state pour le formulaire
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');


    //liste des tags selectionnes
    const [tags, SetTags] = useState([]);

    const [position, setPosition] = useState(route.params?.loc);

    //liste d'adresses pour l'autocompletion
    const [addressData, setAddressData] = useState([]);

    //appel api pour avoir liste autocompletion adresse
    const fetchAddress = async () => {
        setAddressData([]);
        let res = [];
        if(position == null)
            res = await autoComplete(address);
        else
            res = await autoCompleteLoc(address, position.coords.latitude, position.coords.longitude);
        setAddressData(res.items);
    };

    //lors d'une saisie sur le champ adresse
    const onChangeText = (query) => {
        console.log(position);
        setAddress(query);
        setAddrInput('basic');  //mis a jour style formulaire
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

    //verification du formulaire
    const verifForm = async () => {
        let valid = true;

        const res = await geocoding(address); //on verifie si l adresse existe bien

        if(name.trim().length == 0) {
            setNameInput('danger');
            valid = false;
            Toast.show(i18next.t('Toast form incomplete'), {
                duration: Toast.durations.SHORT,
            });
        }
        if(address.trim().length == 0) {
            setAddrInput('danger');
            valid = false;
            Toast.show(i18next.t('Toast form incomplete'), {
                duration: Toast.durations.SHORT,
            });
        }
        else if(res.items.length == 0) {
            setAddrInput('danger');
            valid = false;
            Toast.show(i18next.t('Toast address not correct'), {
                duration: Toast.durations.SHORT,
            });
        }
        return valid;
    };
    
    //enregistrement d'un lieu
    const addPlace = async () => {
        const check = await verifForm();

        if(check) {
            const res = await geocoding(address);
    
            //constitution de notre objet Lieu
            //id mis a jour ds reducer
            const newPlace = {
                "id": 0,
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
    
            Toast.show('Place saved !', {
                duration: Toast.durations.LONG,
            });
    
            navigation.navigate("Places");
        }       
    };

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

    //affichage autocompletion adresse
    const renderAutocomplete = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.address.label}
        />
    );

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
                onChangeText={nextName => {setName(nextName); setNameInput('basic')}}
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

            <TouchableOpacity style={styles.tagList} onPress={() => {navigation.navigate("Tags", {list: tags, path: "Add New Place"})}}>
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
            <Button onPress={addPlace}>
                {i18next.t('Add new place')}
            </Button>
            {/*<Button onPress={resetPlace}>
                reset list places
            </Button>*/}

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
        flexDirection: 'row',
        paddingBottom: 10
    }
});