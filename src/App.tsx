/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator/Navigator.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageSliderInit } from './Helpers/storageHelper';

const App = () => {
  useEffect(() => {
    // AsyncStorage.clear();
    checkStorage();
  });

  async function checkStorage() {
    const response = await AsyncStorage.getItem('@storage_Frente');
    if (response === null) {
      storageSliderInit();
    }
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
