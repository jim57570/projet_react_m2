import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, List, Divider, ListItem, Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';


const Activities = ({ navigation, placesList }) => {
    return (
        <Layout style={styles.container}>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        placesList: state.ReducerPlaces.places
    }
};

export default connect(mapStateToProps)(Activities);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});