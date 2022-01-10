import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomBarNavigation from "./BottomBarNavigation"
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Drawer, DrawerItem, Icon, IndexPath } from '@ui-kitten/components';

import Settings from "../components/Settings"
import { ThemeContext } from '../store/theme-context';

// Icon Home
const HomeIcon = (props) => (
    <Icon {...props} name='home-outline' />
);

// Icon Settings
const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2-outline' />
);

// Icon Sun for bright theme
const SunIcon = (props) => (
    <Icon {...props} name='sun-outline' />
);

// Icon Moon for dark theme
const MoonIcon = (props) => (
    <Icon {...props} name='moon-outline' />
);

// Affecte la navigation à chaque item du drawer
// Remarque : dans le cas où il s'agit du bouton thème, il n'y aura pas de navigation
const CheckIndex = (navigation, state, index, themeContext, setTitleTheme, setIconTheme) => {
    if (index.section == 1 && index.row == 0) {
        if (themeContext.theme == "dark") {
            setIconTheme(SunIcon);
            setTitleTheme("Bright mode");
        }
        else {
            setIconTheme(MoonIcon);
            setTitleTheme("Dark mode");
        }
        themeContext.toggleTheme();
    }
    else {
        navigation.navigate(state.routeNames[index.row]);
    }
}

// Rendue du drawer navigation
const DrawerContent = ({ navigation, state }) => {
    const themeContext = React.useContext(ThemeContext);
    const [titleTheme, setTitleTheme] = useState(themeContext.theme == "light" ? "Bright mode" : "Dark mode");
    const [iconTheme, setIconTheme] = useState(themeContext.theme == "light" ? SunIcon : MoonIcon);
    return (
        <Drawer
            contentContainerStyle={styles.container}
            selectedIndex={new IndexPath(state.index)}
            onSelect={index => CheckIndex(navigation, state, index, themeContext, setTitleTheme, setIconTheme)}>
            <View>
                <DrawerItem title='Home' accessoryLeft={HomeIcon} />
                <DrawerItem title='Settings' accessoryLeft={SettingsIcon} />
            </View>
            <View>
                <DrawerItem title={titleTheme} accessoryLeft={iconTheme}
                />
            </View>
        </Drawer>
    )
};

// Main Drawer navigation
const DrawerBarNavigation = ({...props}) => {

    const DrawerNavigation = createDrawerNavigator();

    return (
        <DrawerNavigation.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={props => <DrawerContent {...props} />}>
            <DrawerNavigation.Screen
                name="Home"
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
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 50
    },

    Item: {
        height: 128,
        flexDirection: 'row',
        marginVertical: 5
    },
    test: {
        marginVertical: 50,
        color: 'white'
    }
});