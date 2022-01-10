import React, { useState } from 'react';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
});

const renderIconTags = (props) => (
    <Icon name='pricetags-outline' {...props} />
);
const renderIconAddress = (props) => (
    <Icon name='pin-outline' {...props} />
);
const renderIconSearch = (props) => (
    <Icon name='search-outline' {...props} />
);

const renderItemAccessory = (props) => {
    return (
        <View>
            <Button size='tiny'>FOLLOW</Button>
            <Button size='tiny'>Test2</Button>
        </View>
    );
};

const renderItem = ({ item, index }) => (
    <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        accessoryRight={renderItemAccessory}
    />
);

const Search = () => {

    // Entrées de l'utilisateur
    const [search, setSearch] = useState();
    const [tags, setTags] = useState();
    const [selectedIndexTags, setSelectedIndexTags] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const [selectedIndexPlace, setSelectedIndexPlace] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);

    const [selectedIndexKilometer, setSelectedIndexKilometer] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);

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
                    style={styles.input}>
                    <SelectItem title='Option 1' />
                    <SelectItem title='Option 2' />
                    <SelectItem title='Option 3' />
                </Select>
                <Layout style={styles.containerPlace}>
                    <Select
                        placeholder='Place'
                        selectedIndex={selectedIndexPlace}
                        onSelect={index => setSelectedIndexPlace(index)}
                        accessoryLeft={renderIconAddress}
                        style={styles.selectPlace}>
                        <SelectItem title='Metz' />
                        <SelectItem title='Thionville' />
                        <SelectItem title='Paris' />
                    </Select>
                    <Select
                        selectedIndex={selectedIndexKilometer}
                        onSelect={index => setSelectedIndexKilometer(index)}
                        style={styles.selectKilometer}>
                        <SelectItem title='5 km' />
                        <SelectItem title='10 km' />
                        <SelectItem title='15 km' />
                    </Select>
                </Layout>
                <Button>
                    Search
                </Button>

            </Layout>
            <List
                style={styles.listItems}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </Layout>
    );
};

export default Search;

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