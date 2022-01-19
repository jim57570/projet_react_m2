import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tagsList from './reducers/tagsList';
import placesList from './reducers/placesList';

const configPersist = {
  key: 'root',
  storage: AsyncStorage,
};

//création combine reducer pour ajouter le reducer des tags et celui des lieux
const allReducers = combineReducers({tags: tagsList, ReducerPlaces: placesList})

const reducerPersist = persistReducer(configPersist, allReducers);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);