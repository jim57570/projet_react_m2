import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigation/Navigation';
import { connect } from 'react-redux';



const ApplicationMain = ({ themeApplication, dispatch }) => {

    console.log("Theme : " + themeApplication);

    return (
        <ApplicationProvider {...eva} theme={themeApplication == "light" ? eva.light : eva.dark}>
            <NavigationContainer>
                <AppNavigator />
                <StatusBar style="auto" />
            </NavigationContainer >
        </ApplicationProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        themeApplication: state.themeApplication
    }
}

export default connect(mapStateToProps)(ApplicationMain);

