import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IndexPath } from '@ui-kitten/components';

import BottomBarNavigation from "./BottomBarNavigation"
import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import Search from "../components/Search"
import Settings from "../components/Settings"
import Carte from "../components/Carte"

const DrawerNavigation = createDrawerNavigator();


const PlacesIcon = (props) => (
    <Icon {...props} name='map-outline' />
);

const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2-outline' />
);

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);

// Affiche la Vue Places
function VuePlacesScreen() {
    return (
        <VuePlacesNavigation.Navigator
            initialRouteName="ViewPlaces"
            screenOptions={{
                headerShown: false
            }}
        >
            <VuePlacesNavigation.Screen
                name="ViewPlaces"
                component={Places}
            />
            <VuePlacesNavigation.Screen
                name="ViewNewPlace"
                component={NewPlace}
            />
            <VuePlacesNavigation.Screen
                name="ViewCarte"
                component={NewPlace}
            />
        </VuePlacesNavigation.Navigator>
    )
};
const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title='Home' style={styles.space}/>
        <DrawerItem title='Settings' />
    </Drawer>
);

// Main Barre de navigation
function DrawerBarNavigation() {
    return (
        <DrawerNavigation.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={props => <DrawerContent {...props} />}>
            <DrawerNavigation.Screen
                name="Places"
                component={BottomBarNavigation}
            />
            <DrawerNavigation.Screen
                name="Settings"
                component={Settings}
            />
        </DrawerNavigation.Navigator>
    );
}

export default DrawerBarNavigation;

const styles = StyleSheet.create({
    space: {
        height: 100,
    },
});