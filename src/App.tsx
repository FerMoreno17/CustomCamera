/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator/Navigator.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageSliderInit } from './Helpers/storageHelper';
import { store } from './Redux/store';
import { Provider } from 'react-redux';

const App = () => {
  useEffect(() => {
    AsyncStorage.clear();
    checkStorage();
  });

  async function checkStorage() {
    const response = await AsyncStorage.getItem('@storage_Frente');
    if (response === null) {
      await storageSliderInit();
    }
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
