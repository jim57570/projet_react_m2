import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/Navigation';

import { Store, Persistor } from './src/store/Config';
import { ThemeContext } from './src/store/theme-context';

export default function App() {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <RootSiblingParent>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva[theme]}>
              <NavigationContainer>
                <AppNavigator {...eva} />
                <StatusBar style="auto" />
              </NavigationContainer >
            </ApplicationProvider>
          </ThemeContext.Provider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}