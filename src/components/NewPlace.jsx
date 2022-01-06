import React from 'react';
import { Layout, Input, Button, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import Assets from '../definitions/Assets';

const NewPlace = () => {

    const [value, setValue] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState([
        new IndexPath(0),
        new IndexPath(1),
    ]);
    const renderIcon = style => (
        <Image source={Assets.icons.address}/>
      );

    return (
        <Layout style={styles.container}>
            <Input
                placeholder='Name'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
            />
            <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder='Description'
                onChangeText={nextValue => setValue(nextValue)}
            />
            <Select
                placeholder='Tags'
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
            </Select>
            <Input
                placeholder='Address'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
                accessoryLeft={renderIcon}
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