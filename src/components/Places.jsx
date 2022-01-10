import React, { useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Places = ({ navigation, testVariable, dispatch}) => {

    const [title, setTitle] = useState(testVariable);
    const ChangeTitle = () => {
        const action = { type: 'CHANGE_TITLE' };
        dispatch(action);
    }

    const navigateToAddNewPlace = () => {
        navigation.navigate("ViewNewPlace");
      };

      const navigateToMap = () => {
        navigation.navigate("ViewCarte");
      };

    return (
        <Layout style={styles.container}>
            <Text category='h1'>{testVariable}</Text>
            <Button onPress={ChangeTitle}>
                Changer le titre
            </Button>
            <Button onPress={navigateToAddNewPlace}>
                Add New Place
            </Button>
            <Button onPress={navigateToMap}>
                Allez sur la carte
            </Button>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        testVariable: state.testVariable
    }
}

export default connect(mapStateToProps)(Places);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});