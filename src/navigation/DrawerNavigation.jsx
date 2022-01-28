import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomBarNavigation from "./BottomBarNavigation"

import { createDrawerNavigator } from '@react-navigation/drawer';


import { Drawer, DrawerItem, Icon, IndexPath, Modal, Card, Text, Button } from '@ui-kitten/components';

import Settings from "../components/Settings"
import { ThemeContext } from '../store/theme-context';

import i18next from 'i18next';

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

// Icon Moon for dark theme
const LanguageIcon = (props) => (
    <Icon {...props} name='globe-2-outline' />
);

// Rendue du drawer navigation
const DrawerContent = ({ navigation, state }) => {
    const themeContext = React.useContext(ThemeContext);
    const [titleTheme, setTitleTheme] = useState(themeContext.theme == "light" ? i18next.t('Bright mode') : i18next.t('Dark mode'));
    const [iconTheme, setIconTheme] = useState(themeContext.theme == "light" ? SunIcon : MoonIcon);
    const [visible, setVisible] = React.useState(false);


    // Affecte la navigation à chaque item du drawer
    // Remarque : dans le cas où il s'agit du bouton thème, il n'y aura pas de navigation
    const CheckIndex = (navigation, state, index, themeContext, setTitleTheme, setIconTheme) => {
        if (index.section == 1) {
            if (index.row == 1) {
                if (themeContext.theme == "dark") {
                    setIconTheme(SunIcon);
                    setTitleTheme(i18next.t('Bright mode'));
                }
                else {
                    setIconTheme(MoonIcon);
                    setTitleTheme(i18next.t('Dark mode'));
                }
                themeContext.toggleTheme();
            }
            else {
                setVisible(true);
                if (i18next.language == 'fr')
                    i18next.changeLanguage('en');
                else if (i18next.language == 'en')
                    i18next.changeLanguage('fr');

                if (themeContext.theme == "dark") {
                    setTitleTheme(i18next.t('Bright mode'));
                }
                else {
                    setTitleTheme(i18next.t('Dark mode'));
                }
            }

        }
        else {
            navigation.navigate(state.routeNames[index.row]);
        }
    }


    return (
        <View style={styles.view}>
            <Drawer
                contentContainerStyle={styles.container}
                selectedIndex={new IndexPath(state.index)}
                onSelect={index => CheckIndex(navigation, state, index, themeContext, setTitleTheme, setIconTheme)}>
                <View>
                    <DrawerItem title={i18next.t('Home')} accessoryLeft={HomeIcon} />
                    <DrawerItem title={i18next.t('Settings')} accessoryLeft={SettingsIcon} />
                </View>
                <View>
                    <DrawerItem title={i18next.t('Languages')} accessoryLeft={LanguageIcon} />
                    <DrawerItem title={titleTheme} accessoryLeft={iconTheme} />

                </View>
            </Drawer>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <View>
                        <Text>Change the </Text>
                        <Button onPress={() => setVisible(false)}>
                            DISMISS
                        </Button>
                    </View>
                </Card>
            </Modal>
        </View>

    )
};

// Main Drawer navigation
const DrawerBarNavigation = ({ ...props }) => {

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
    view: {
        flex: 1,
    },
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
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});