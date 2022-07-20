/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
// import Mascara from './Mascara.component';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useNavigation } from '@react-navigation/native';
// import FabIcon from './FabIcon.component';
import SettingsModal from '../Components/SettingsModal.component';
import { cropImage } from '../Helpers/CropImageHelper';
import { getBase64 } from '../Helpers/Base64Helper';

export default function CameraScreen() {
    let camera = useRef<RNCamera>(null);
    // const navigation = useNavigation();
    const { width, height } = Dimensions.get('screen');
    const [tomarFoto, setTomarFoto] = useState(true);
    const [showModal, setShowModal] = useState(false);

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
        containerText: {
            zIndex: 2,
            position: 'absolute',
            bottom: height * 0.25,
            left: width * 0.2,
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
        text: {
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
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
        if (camera) {
            const options: TakePictureOptions = {
                quality: 1,
                base64: true,
                orientation: 'portrait',
                //Android
                fixOrientation: true,
                //iOS
                forceUpOrientation: true,
            };
            const foto = await camera.current?.takePictureAsync(options);

            if (foto?.base64) {
                camera?.current?.pausePreview();
                const image = await cropImage(foto.uri, foto?.width, foto?.height)
                    .catch(error => console.log('errorCam==>', error));
                await getBase64(image, desafio);
                // navigation.navigate('PreviewScreen', { image: data.uri });
            }
        }

    }

    const handleFaceDetection = ({ faces }: any) => {
        if (tomarFoto && faces && faces[0]) {
            // console.log("--->",JSON.stringify(faces, null, 2));
            // console.log("--->",faces);
            console.log('Y-->', faces[0].yawAngle + '\t R-->', faces[0].rollAngle + '\t\t I-->', faces[0].inclinationAngle);

            if (faces[0].inclinationAngle > 20 && faces[0].yawAngle > 2) {
                console.log('mirando arriba');
                console.log('Y-->', faces[0].yawAngle + '\t R-->', faces[0].rollAngle + '\t\t I-->', faces[0].inclinationAngle);
                takePicture('arriba_');
                setTomarFoto(false);
                return;
            }

            if (faces[0].inclinationAngle < -10 && faces[0].yawAngle < -0.5) {
                console.log('mirando abajo');
                console.log('Y-->', faces[0].yawAngle + '\t R-->', faces[0].rollAngle + '\t\t I-->', faces[0].inclinationAngle);
                takePicture('abajo_');
                setTomarFoto(false);
                return;
            }

            if ((faces[0].yawAngle > 0 && faces[0].yawAngle < 2 && faces[0].inclinationAngle > 0 && faces[0].inclinationAngle < 2)) {
                console.log('mirando al frente');
                console.log('Y-->', faces[0].yawAngle + '\t R-->', faces[0].rollAngle + '\t\t I-->', faces[0].inclinationAngle);
                takePicture('frente_');
                setTomarFoto(false);
                return;
            }

            if (faces[0].yawAngle > -25 && faces[0].yawAngle < -20) {
                console.log('mirando a la derecha');
                takePicture('derecha_');
                setTomarFoto(false);
                return;
            }

            if (faces[0].yawAngle > 20 && faces[0].yawAngle < 25) {
                console.log('mirando a la izquierda');
                takePicture('izquierda_');
                setTomarFoto(false);
                return;
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={camera}
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
            <View style={styles.containerText}>
                <Text style={styles.text}>{'Asegurate que la foto \n haya sido tomada correctamente'}</Text>
            </View>
            {/* <Mascara /> */}
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
