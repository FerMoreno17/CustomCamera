/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RNCamera, TakePictureOptions } from '../react-native-camera';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useNavigation } from '@react-navigation/native';
// import FabIcon from './FabIcon.component';
import SettingsModal from '../Components/SettingsModal.component';
import { cropImage } from '../Helpers/CropImageHelper';
import { getBase64 } from '../Helpers/Base64Helper';
import { useAppSelector } from '../Redux/hooks';
import Mascara from '../Components/Mascara.component';

export default function CameraScreen() {
    let cameraRef = useRef<RNCamera>(null);
    // const navigation = useNavigation();
    const { width, height } = Dimensions.get('screen');
    const [tomarFoto, setTomarFoto] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [gestoMensaje, setGestoMensaje] = useState('');

    const [gestoArriba, setGestoArriba] = useState<number[]>([]);
    const [gestoAbajo, setGestoAbajo] = useState<number[]>([]);
    const [gestoFrente, setGestoFrente] = useState<number[]>([]);
    const [gestoDerecha, setGestoDerecha] = useState<number[]>([]);
    const [gestoIzquierda, setGestoIzquierda] = useState<number[]>([]);

    const {
        abajo_values,
        arriba_values,
        derecha_values,
        frente_values,
        izquierda_values } = useAppSelector(state => state.setting);

    useEffect(() => { setGestoAbajo(abajo_values); }, [abajo_values]);
    useEffect(() => { setGestoArriba(arriba_values); }, [arriba_values]);
    useEffect(() => { setGestoFrente(frente_values); }, [frente_values]);
    useEffect(() => { setGestoDerecha(derecha_values); }, [derecha_values]);
    useEffect(() => { setGestoIzquierda(izquierda_values); }, [izquierda_values]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        camera: {
            position: 'absolute',
            flex: 1,
            width: width,
            height: height,
        },
        boton: {
            position: 'absolute',
            bottom: 20,
            backgroundColor: 'grey',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
        },
        containerMensaje: {
            backgroundColor:'#2196F3',
            padding:10,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:height * 0.2,
            zIndex:99,
        },
        mensaje: {
            color: 'black',
            fontSize: 24,
        },
        label: {
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
        },
        iconFace: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        iconArrowLeft: {
            position: 'absolute',
            top: height * 0.23,
            left: width * 0.2,
        },
        // circuloInterior: {
        //     position: 'absolute',
        //     top:0,
        //     left: width * 0.18,
        //     width: width * 0.63,
        //     height: width * 0.63,
        //     borderColor: 'green',
        //     borderWidth: 5,
        //     borderRadius: (width * 0.63) / 2,
        // },
    });

    useEffect(() => {
        setTomarFoto(true);
    }, []);

    async function takePicture(desafio: string) {
        if (cameraRef) {
            const options: TakePictureOptions = {
                quality: 1,
                base64: true,
                orientation: 'portrait',
                //Android
                fixOrientation: true,
                //iOS
                forceUpOrientation: true,
            };
            const foto = await cameraRef.current?.takePictureAsync(options);

            if (foto?.base64) {
                cameraRef?.current?.pausePreview();
                const image = await cropImage(foto.uri, foto?.width, foto?.height)
                    .catch(error => console.log('errorCam==>', error));
                await getBase64(image, desafio);
                // navigation.navigate('PreviewScreen', { image: data.uri });
            }
        }

    }

    const handleFaceDetection = ({ faces }: any) => {
        const gesto = faces[0];
        if (tomarFoto && faces && faces[0]) {
            // console.log("--->",JSON.stringify(faces, null, 2));
            // console.log("--->",faces);
            console.log('Y-->', gesto.yawAngle + '\t R-->', gesto.rollAngle + '\t\t I-->', gesto.inclinationAngle);
            if ( gesto.inclinationAngle > gestoArriba[0]
                && gesto.inclinationAngle < gestoArriba[1]) {
                setGestoMensaje('mirando arriba');

                console.log(
                    'Y-->', gesto.yawAngle +
                '\t R-->', gesto.rollAngle +
                '\t\t I-->', gesto.inclinationAngle
                );

                // takePicture('arriba_');
                // setTomarFoto(false);
                // return;
            }

            if (gesto.yawAngle < -0.5
                && gesto.inclinationAngle > gestoAbajo[0]
                && gesto.inclinationAngle < gestoAbajo[1]) {
                setGestoMensaje('mirando abajo');
                console.log(
                    'Y-->', gesto.yawAngle +
                '\t R-->', gesto.rollAngle +
                '\t\t I-->', gesto.inclinationAngle
                );
                // takePicture('abajo_');
                // setTomarFoto(false);
                // return;
            }

            if ((gesto.yawAngle > gestoFrente[0]
                && gesto.yawAngle < gestoFrente[1]
                && gesto.inclinationAngle > 0
                && gesto.inclinationAngle < 10)) {
                setGestoMensaje('mirando al frente');
                console.log(
                    'Y-->', gesto.yawAngle +
                '\t R-->', gesto.rollAngle +
                '\t\t I-->', gesto.inclinationAngle
                );
                // takePicture('frente_');
                // setTomarFoto(false);
                // return;
            }

            if (gesto.yawAngle > gestoDerecha[0]
                && gesto.yawAngle < gestoDerecha[1]) {
                setGestoMensaje('mirando a la derecha');
                console.log(
                    'Y-->', gesto.yawAngle +
                '\t R-->', gesto.rollAngle +
                '\t\t I-->', gesto.inclinationAngle
                );
                // takePicture('derecha_');
                // setTomarFoto(false);
                // return;
            }

            if (gesto.yawAngle > gestoIzquierda[0]
                && gesto.yawAngle < gestoIzquierda[1]) {
                setGestoMensaje('mirando a la izquierda');
                console.log(
                    'Y-->', gesto.yawAngle +
                '\t R-->', gesto.rollAngle +
                '\t\t I-->', gesto.inclinationAngle
                );
                // takePicture('izquierda_');
                // setTomarFoto(false);
                // return;
            }
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.front}

                flashMode={RNCamera.Constants.FlashMode.on}
                captureAudio={false}
                faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
                onFacesDetected={handleFaceDetection}
                autoFocus={'on'}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={styles.containerMensaje}>
                <Text style={styles.mensaje}>{gestoMensaje}</Text>
            </View>
            <Mascara />
            {/* <View style={styles.iconFace}>
                <Icon name="bug" size={50} color="blue" />
            </View>
            <View style={styles.iconArrowLeft}>
                <Icon name="chevron-left" size={40} color="black" />
            </View> */}
            {/* <View style={styles.circuloInterior} /> */}
            <Pressable onPress={() => setTomarFoto(true)} style={styles.boton}>
                <Text style={styles.label}> RESET </Text>
            </Pressable>

            <SettingsModal setShowModal={setShowModal} showModal={showModal} />
        </View >
    );
}
