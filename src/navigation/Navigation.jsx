import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, BottomNavigation, BottomNavigationTab, Layout, Text, Icon, IndexPath } from '@ui-kitten/components';

import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import VueTest2 from "../components/Search"
import Settings from "../components/Settings"
import DrawerBarNavigation from "./DrawerNavigation"
import BottomBarNavigation from "./BottomBarNavigation"



// Main Barre de navigation
function AppNavigator() {
    return ( 
        <DrawerBarNavigation/>
    );
}

export default AppNavigator;