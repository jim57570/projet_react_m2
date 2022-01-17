import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Text, Input, Button, IndexPath, Select, SelectItem, Icon, Autocomplete, AutocompleteItem, List, ListItem } from '@ui-kitten/components';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';


import { autoComplete, geocoding } from '../api/Here';

const Tags = ({navigation, route, tagsList, dispatch}) => {

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={back}>
                    Done
                </Button>
            )
        })
    })

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {console.log('TCHAO')}
        );
        return () => backHandler.remove();
    }, [])

    
    const [list, setList] = useState(route.params.list);
    
    const back = () => {
        console.log(list);
        navigation.navigate("Add New Place", {list: list});
    }
    const [tagName, setTagName] = useState('');
    const [tagAutocomplete, setTagAutocomplete] = useState([]);
    const [tagSelected, setTagSelected] = useState([]);

    const onChangeText = (query) => {
        setTagName(query);
        setTagAutocomplete([{"name": "Add " + query}]);
        console.log('OH');
    };

    const onSelect = (index) => {
        if(tagAutocomplete[index].name.includes("Add")) {
            //setTagSelected(tagSelected.concat([{"name": tagName}]));
            setList(list.concat([{"name": tagName}]));
        }
        setTagName('');
        setTagAutocomplete([]);
        //console.log(list);
    };

    const renderAutocomplete = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.name}
        />
    );

    const renderIconTags = (props) => (
        <Icon name='pricetags-outline' {...props} />
    );
    const renderItem = ({item, index}) => (
        <ListItem
            title={item.name}
        />
    );


    return (
        <Layout style={styles.container}>
                <Autocomplete
                    placeholder="Add a tag"
                    value={tagName}
                    onSelect={onSelect}
                    onChangeText={onChangeText}
                    accessoryLeft={renderIconTags}
                    style={styles.input}
                    >
                    {tagAutocomplete.map(renderAutocomplete)}
                </Autocomplete>
            <View>
                <Text>Tags selected :</Text>
                <List 
                    data={list}
                    renderItem={renderItem}
                />
            </View>
            <View>
                <Text>Edit tags :</Text>
                <List
                    data={tagsList.tags}
                    renderItem={renderItem}
                />
            </View>
        </Layout>
        
    )
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        tagsList: state.tags
    }
}

export default connect(mapStateToProps)(Tags);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        paddingBottom: 10
    }
});