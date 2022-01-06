import React from 'react';
import { Layout, Input, Button, IndexPath, Select, SelectItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import Assets from '../definitions/Assets';

const NewPlace = () => {

    const [value, setValue] = React.useState('');
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

    return (
        <Layout style={styles.container}>
            <Input
                placeholder='Name'
                accessoryLeft={renderIconText}
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder='Description'
                accessoryLeft={renderIconText}
                onChangeText={nextValue => setValue(nextValue)}
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
            <Input
                placeholder='Address'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
                accessoryLeft={renderIconAddress}
            />
            <Button>
                Add place
            </Button>
        </Layout>
    );
};

export default NewPlace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});