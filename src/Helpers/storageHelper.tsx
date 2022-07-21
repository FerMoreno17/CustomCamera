import AsyncStorage from '@react-native-async-storage/async-storage';
import { facePosition } from '../Enums/facePosition.enum';
import { SliderSetting } from '../Models/SliderSetting.model';
import { setAbajoValues, setArribaValues, setDerechaValues, setFrenteValues, setIzquierdaValues } from '../Redux/reducer/settingReducer';
import { store } from '../Redux/store';

export async function storageSliderInit() {
    console.log('entro');
    await AsyncStorage.setItem(
        '@storage_Frente',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Frente, valueStart: 0, valueEnd: 2 }
        )));
    store.dispatch(setFrenteValues([0, 2]));
    console.log('pase frente');
    await AsyncStorage.setItem(
        '@storage_Abajo',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Abajo, valueStart: -20, valueEnd: -10 }
        )));
    store.dispatch(setAbajoValues([-20, -25]));

    await AsyncStorage.setItem(
        '@storage_Arriba',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Arriba, valueStart: 20, valueEnd: 25 }
        )));
    store.dispatch(setFrenteValues([20, 25]));

    await AsyncStorage.setItem(
        '@storage_Izquierda',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Izquierda, valueStart: 20, valueEnd: 25 }
        )));
    store.dispatch(setIzquierdaValues([20, 25]));

    await AsyncStorage.setItem(
        '@storage_Derecha',
        JSON.stringify(new SliderSetting(
            { gesture: facePosition.Derecha, valueStart: -25, valueEnd: 20 }
        )));
    store.dispatch(setDerechaValues([-25, -20]));
}

export async function storageSlidersSettings(data: SliderSetting) {
    AsyncStorage.setItem(
        `@storage_${data.gesture}`,
        JSON.stringify(data));
}

export async function getSlidersSettings(position?: facePosition) {
    const settings = await AsyncStorage.getItem(`@storage_${position}`);
    if (settings) {
        const temp: SliderSetting = JSON.parse(settings);
        setGestureValues(position!, temp.valueStart!, temp.valueEnd!);
        return temp;
    }
}

function setGestureValues(gesture: facePosition, start: number, end: number) {
    switch (gesture) {
        case facePosition.Frente:
            store.dispatch(setFrenteValues([start, end]));
            break;
        case facePosition.Abajo:
            store.dispatch(setAbajoValues([start, end]));
            break;
        case facePosition.Arriba:
            store.dispatch(setArribaValues([start, end]));
            break;
        case facePosition.Derecha:
            store.dispatch(setDerechaValues([start, end]));
            break;
        case facePosition.Izquierda:
            store.dispatch(setIzquierdaValues([start, end]));
            break;
    }
}
