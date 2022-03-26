import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Text, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem, List, ListItem, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { autoComplete, geocoding } from '../api/Here';
import { TouchableOpacity } from "react-native-gesture-handler";
import i18next from 'i18next';



const Tags = ({navigation, route, tagsList, dispatch}) => {
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button appearance={'ghost'} onPress={back}>
                    {i18next.t('Done')}
                </Button>
            )
        })
    })

    const [list, setList] = useState(route.params.list);
    const [tagName, setTagName] = useState('');
    const [tagAutocomplete, setTagAutocomplete] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);

    
    const back = () => {
        navigation.navigate(route.params.path, {list: list});
    }
    
    //mis a jour de l'autocomplete
    const onChangeText = (query) => {
        setTagName(query);
        setTagAutocomplete([]);
        if (query.length > 0) {
            let suggest = [];
            //on verifie si la recherche correspond à un tag existant
            if(tagsList.tags.findIndex(tag => tag.name === query) == -1)
                suggest = suggest.concat([{"name": "Add " + query}]);
            
            const filter = tagsList.tags.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()));
            suggest = suggest.concat(filter)
            setTagAutocomplete(suggest);
        }
    };

    //CHoix d'un tag dans la barre de recherche
    const onSelect = (index) => {
        //on verifie dans un premier temps que le tag n'a pas deja ete selectionne
        if(list.findIndex(tag => tag.name === tagAutocomplete[index].name) == -1) {
            //Si la suggestion contient "Add" alors on enregistre ce tag dans le reducer
            if(tagAutocomplete[index].name.includes("Add")) {
                const action = {type: 'ADD_TAG', value: {"name": tagName}};
                dispatch(action);  
            }
            setList(list.concat({"name": tagName}));
        }
        setTagName('');
        setTagAutocomplete([]);
    };

    //delete a selected tag
    //degeu
    const deleteSelected = (index) => {
        //setList([]);
        
        const oui = [...list];
        oui.splice(index, 1);
        //console.log(oui);
        setList(oui);
    };

    //DEBUG ONLY
    const resetTags = () => {
        const action = {type: 'RESET_TAG'};
        dispatch(action);
    }

    //Ajout d'un tag enregistré à la liste des selectionnées
    const addSavedTag = (index) => {
        //on vérifie que le tag ne soit pas deja selectionne
        //if(list.indexOf(tagsList.tags[index]) == -1)
        if(list.findIndex(tag => tag.name == tagsList.tags[index].name) == -1)
            setList(list.concat(tagsList.tags[index]));
    }

    const renderAutocomplete = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.name}
        />
    );

    const renderIconTags = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );
    //rendu item list tags selectionnes
    const renderItem = ({item, index}) => (
        <View style={styles.tag}>
            <Text status={'control'}>{item.name}</Text>
            <Button style={styles.btnTag} onPress={() => deleteSelected(index)}>
                X
            </Button>
        </View>
    );
    //rendu item list tags saved
    //add edit and delete
    const renderSavedTags = ({item, index}) => (
        <TouchableOpacity onPress={() => addSavedTag(index)}>
            <View style={styles.tag}>
                <Text status={'control'}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20
        },
        input: {
            paddingBottom: 10
        },
        tag: {
            backgroundColor: theme['color-primary-default'],
            flexDirection: 'row',
            borderRadius: 10,
            alignItems: 'center',
            height: 30,
            margin: 10,
            padding: 5,
            paddingRight: 0
        },
        btnTag: {
            maxHeight: 20,
            padding: 0,
            borderWidth: 0
            
        }
    });


    return (
        <Layout style={styles.container}>
            <View>
                <Text category="h5">{i18next.t('Tags selected')}</Text>
                {list.length > 0 &&
                    <List 
                        data={list}
                        renderItem={renderItem}
                        horizontal={true}
                    />
                } 
                {list.length == 0 &&
                    <Text>{i18next.t('No tags selected')}</Text>
                }
            </View>
            <Autocomplete
                placeholder={i18next.t('Add a tag')}
                value={tagName}
                onSelect={onSelect}
                onChangeText={onChangeText}
                accessoryLeft={renderIconTags}
                style={styles.input}
                >
                {tagAutocomplete.map(renderAutocomplete)}
            </Autocomplete>
            <View>
                <Text category="h5">{i18next.t('Existing tags')}</Text>
                <List
                    data={tagsList.tags}
                    renderItem={renderSavedTags}
                />
            </View>
            {/*<Button onPress={resetTags}>
                reset list tags
            </Button>*/}
        </Layout>
        
    )
};

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        tagsList: state.tags
    }
}

export default connect(mapStateToProps)(Tags);
