import AsyncStorage from '@react-native-async-storage/async-storage';
import { facePosition } from '../Enums/facePosition.enum';
import { SliderSetting } from '../Models/SliderSetting.model';

export async function storageSliderInit() {
    await AsyncStorage.setItem(
        '@storage_Frente',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Frente, valueStart: 0, valueEnd: 10 }
        )));
    await AsyncStorage.setItem(
        '@storage_Abajo',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Abajo, valueStart: 20, valueEnd: 40 }
        )));
    await AsyncStorage.setItem(
        '@storage_Arriba',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Arriba, valueStart: 20, valueEnd: 40 }
        )));
    await AsyncStorage.setItem(
        '@storage_Izquierda',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Izquierda, valueStart: 20, valueEnd: 40 }
        )));
    await AsyncStorage.setItem(
        '@storage_Derecha',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Derecha, valueStart: 20, valueEnd: 40 }
        )));
}

export async function storageSlidersSettings(data: SliderSetting) {
    AsyncStorage.setItem(
        `@storage_${data.gesture}`,
        JSON.stringify(data));
}

export async function getSlidersSettings(
    position?: facePosition
) {
    const settings = await AsyncStorage.getItem(`@storage_${position}`);
    if (settings) {
        const temp: SliderSetting = JSON.parse(settings);
        return temp;
    }
}
