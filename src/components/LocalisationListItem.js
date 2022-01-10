import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';




const LocalisationListItem = ({ onClick, LocalisationData }) => {



  return (
    <TouchableOpacity style={styles.container} onPress={() => { onClick(LocalisationData.id) }}>

      <View style={styles.informationContainer}>

        <Text> __________________________________</Text>
        <Text style={styles.title}> {LocalisationData.loc} </Text>
        <Text> {LocalisationData.nom}</Text>
        <Text> __________________________________</Text>
      </View>

    </TouchableOpacity>
  );
};

export default LocalisationListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /*  thumbnail: {
     width: 128,
     height: 128,
     borderRadius: 12,
     backgroundColor: Colors.mainGreen,
   }, */
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  /* icon: {
    tintColor: Colors.mainGreen,
  }, */
  stat: {
    marginLeft: 4,
  },
});