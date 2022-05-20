/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Camera from './Camera.component';
import Preview from './Preview.component';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Preview" component={Preview} />
    </Stack.Navigator>
  )
}