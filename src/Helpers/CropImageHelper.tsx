import ImageEditor, { ImageCropData } from '@react-native-community/image-editor';
import { Platform } from 'react-native';

export async function cropImage(imageUri: string, width_: number, height_: number) {
    const anchoRecomendado = 600;
    const altoRecomendado = 720;
    const heightOS = Platform.OS === 'ios' ? 0 : height_ * 0.16;
    const transformData: ImageCropData = {
        offset: { x: 0, y: heightOS },
        size: { width: width_, height: width_ * (anchoRecomendado / altoRecomendado) },
        displaySize: { width: anchoRecomendado, height: altoRecomendado },
    };

    const result = await ImageEditor.cropImage(imageUri, transformData);
    return result;
}
