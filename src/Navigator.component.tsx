import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CameraScreen from './Camera.component';
import PreviewScreen from './Preview.component';

type RootStackParamList = {
  CameraScreen: undefined;
  PreviewScreen: { image: string };
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
    </Stack.Navigator>
  );
}
