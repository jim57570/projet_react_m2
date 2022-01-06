import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { ThemeContext } from '../store/theme-context';




const Settings = () => {

  const themeContext = React.useContext(ThemeContext);

  return (
    <Layout style={styles.container}>
      <Button onPress={themeContext.toggleTheme}>
        Changer le thème
      </Button>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});