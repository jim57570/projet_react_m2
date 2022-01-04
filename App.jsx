import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';

import Home from './src/components/Home';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <Home/>
        <StatusBar style="auto" />
    </ApplicationProvider>
  );
}