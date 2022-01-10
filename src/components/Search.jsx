import React, { useState } from 'react';
import { Layout, Divider, List, ListItem, Button, Input, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
});

// Test
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
    const [selectedIndex, setSelectedIndex] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);

    return (
        <Layout style={styles.container}>
            <Input
                placeholder='Search'
                accessoryLeft={renderIconSearch}
                value={search}
                onChangeText={nextValue => setSearch(nextValue)}
            />
            <Select
                placeholder='Tags'
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                accessoryLeft={renderIconTags}>
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
            </Select>
            <Select
                placeholder='Place'
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                accessoryLeft={renderIconAddress}>
                <SelectItem title='Metz' />
                <SelectItem title='Thionville' />
                <SelectItem title='Paris' />
            </Select>
            <Select
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <SelectItem title='5 km' />
                <SelectItem title='10 km' />
                <SelectItem title='15 km' />
            </Select>
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
    listItems: {
    }
});