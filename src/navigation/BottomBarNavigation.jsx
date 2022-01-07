import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IndexPath } from '@ui-kitten/components';

import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import Search from "../components/Search"
import Settings from "../components/Settings"

const TabNavigation = createBottomTabNavigator();
const VuePlacesNavigation = createStackNavigator();
const VueSearchNavigation = createStackNavigator();


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
        </VuePlacesNavigation.Navigator>
    )
};

// Affiche la Vue 2
function VueSearch() {
    return (
        <VueSearchNavigation.Navigator
            initialRouteName="Search"
        >
            <VueSearchNavigation.Screen
                name="Search"
                component={Search}
            />
        </VueSearchNavigation.Navigator>
    )
};

// Barre de navigation
const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Places' icon={PlacesIcon} style={styles.space} />
        <BottomNavigationTab title='Search' icon={SearchIcon} style={styles.space} />
    </BottomNavigation>
);

// Main Barre de navigation
function BottomBarNavigation() {
    return (
        <TabNavigation.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <BottomTabBar {...props} />}>
            <TabNavigation.Screen
                name="Places"
                component={VuePlacesScreen}
            />
            <TabNavigation.Screen
                name="Search"
                component={Search}
            />
        </TabNavigation.Navigator>
    );
}

export default BottomBarNavigation;

const styles = StyleSheet.create({
    space: {
        height: 100,
    },
});