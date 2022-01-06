import React from 'react';
import { Layout, Divider, List, ListItem, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
});

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

const VueTest2 = () => {
    return (
        <Layout style={styles.container}>
            <List
                style={styles.listItems}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </Layout>
    );
};

export default VueTest2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItems: {
    }
});