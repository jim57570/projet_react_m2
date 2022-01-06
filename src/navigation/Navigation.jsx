import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';

import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import VueTest2 from "../components/VueTest2"
import Settings from "../components/Settings"

const VuePlacesNavigation = createStackNavigator();
const VueTest2Navigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const PlacesIcon = (props) => (
    <Icon {...props} name='map-outline'/>
  );

  const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2-outline'/>
  );

  const SearchIcon = (props) => (
    <Icon {...props} name='search-outline'/>
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

// Barre de navigation
const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Places' icon={PlacesIcon} />
        <BottomNavigationTab title='Search' icon={SearchIcon} />
        <BottomNavigationTab title='Settings' icon={SettingsIcon} />
    </BottomNavigation>
);

// Main Barre de navigation
function AppNavigator() {
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
                name="Vue Test 2"
                component={VueTest2}
            />
            <TabNavigation.Screen
                name="Settings"
                component={Settings}
            />
        </TabNavigation.Navigator>
    );
}

export default AppNavigator;