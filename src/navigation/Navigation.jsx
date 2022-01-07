import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IndexPath } from '@ui-kitten/components';

import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import VueTest2 from "../components/VueTest2"
import Settings from "../components/Settings"
import DrawerBarNavigation from "./DrawerNavigation"
import BottomBarNavigation from "./BottomBarNavigation"

const VueTest2Navigation = createStackNavigator();






// Affiche la Vue 2
function VueTest2Screen() {
    return (
        <VueTest2Navigation.Navigator
            initialRouteName="ViewVueTest2"
        >
            <VueTest2Navigation.Screen
                name="ViewVueTest2"
                component={VueTest2}
            />
        </VueTest2Navigation.Navigator>
    )
};





// Main Barre de navigation
function AppNavigator() {
    return (
        <BottomBarNavigation/>
    );
}

const styles = StyleSheet.create({
    space: {
        height: 100,
    },
});

export default AppNavigator;