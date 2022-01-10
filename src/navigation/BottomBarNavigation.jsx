
import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomNavigation, BottomNavigationTab, Icon, useTheme } from '@ui-kitten/components';

import Places from "../components/Places"
import NewPlace from "../components/NewPlace"
import Search from "../components/Search"






// Icon places
const PlacesIcon = (props) => (
    <Icon {...props} name='map-outline' />
);

// Icon search
const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);

// Affiche la Vue Places
function VuePlacesScreen() {
    const VuePlacesNavigation = createStackNavigator();
    const theme = useTheme();
    return (
        <VuePlacesNavigation.Navigator
            initialRouteName="Places"
            screenOptions={{
                headerShown: true,
                headerBackTitleStyle: {
                    // backgroundColor: theme['background-basic-color-1']
                },
                headerStyle: {
                    backgroundColor: theme['background-basic-color-1'],
                    borderColor: theme['border-basic-color-1']
                },
                headerTintColor: theme['text-basic-color'],
            }}
        >
            <VuePlacesNavigation.Screen

                name="Places"
                component={Places}
                options={{ headerShown: false }}
            />
            <VuePlacesNavigation.Screen
                name="Add New Place"
                component={NewPlace}
                screenOptions={{
                    headerShown: true,
                }}
            />
            <VuePlacesNavigation.Screen
                name="ViewCarte"
                component={Carte}
            />
            <VuePlacesNavigation.Screen
                name="ViewLocalisationDetail"
                component={Localisation}
            />
        </VuePlacesNavigation.Navigator>
    )
};

// Affiche la Vue Search
function VueSearch() {
    const VueSearchNavigation = createStackNavigator();
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

// Rendue de la Barre de navigation
const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Places' icon={PlacesIcon} style={styles.space} />
        <BottomNavigationTab title='Search' icon={SearchIcon} style={styles.space} />
    </BottomNavigation>
);

// Main Barre de navigation
const BottomBarNavigation = (props) => {
    const TabNavigation = createBottomTabNavigator();
    return (
        <TabNavigation.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={props => <BottomTabBar {...props} />}>
            <TabNavigation.Screen
                name="ViewPlaces"
                component={VuePlacesScreen}
            />
            <TabNavigation.Screen
                name="ViewSearch"
                component={VueSearch}
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