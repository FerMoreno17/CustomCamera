/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageSliderInit } from './storageHelper';

const App = () => {
  useEffect(() => {
    // AsyncStorage.clear();
    checkStorage();
  });

  async function checkStorage() {
    const response = await AsyncStorage.getItem('@storage_Frente');
    if (response === null) {
      console.log('entro');
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
