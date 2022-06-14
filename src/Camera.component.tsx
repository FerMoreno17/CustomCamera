/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
import RNFS from 'react-native-fs';
import Mascara from './Mascara.component';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Camera({ navigation }: any) {
    let camera = useRef(null);
    const { width, height } = Dimensions.get('screen');
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


    let tomar = true;
    async function takePicture() {
        if (camera) {
            const options: TakePictureOptions = { quality: 0.5, base64: true };
            const data = await camera.current?.takePictureAsync(options);
            // await getBase64(data);
            navigation.navigate('Preview', { image: data?.uri });
        }
    }

    async function getBase64(imageUri: string) {
        console.log('==>', imageUri);
        const filepath = imageUri.split('//')[1];
        const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
        console.log(imageUriBase64);
        return imageUriBase64;
    }

    const handleFaceDetection = ({ faces }: any) => {
        if (faces && faces[0]) {
            // console.log("--->",JSON.stringify(faces, null, 2));
            // console.log("--->",faces);
            // console.log("Y-->",faces[0].yawAngle +  "\t R-->",faces[0].rollAngle + "\t\t I-->", faces[0].inclinationAngle);

            if (faces[0].inclinationAngle > 20 && faces[0].inclinationAngle < 25) {
                console.log('mirando arriba');
                takePicture();
                tomar = false;
            }

            if (faces[0].inclinationAngle > -25 && faces[0].inclinationAngle < -20) {
                console.log('mirando abajo');
            }

            if ((faces[0].yawAngle > 0 && faces[0].yawAngle < 2)) {
                console.log('mirando al frente');
            }

            if (faces[0].yawAngle > -25 && faces[0].yawAngle < -20) {
                console.log('mirando a la derecha');
            }

            if (faces[0].yawAngle > 20 && faces[0].yawAngle < 25) {
                console.log('mirando a la izquierda');
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
                <Text style={styles.text}>{'Asegurate que la foto \n haya sido tomada correctamtne'}</Text>
            </View>
            <Mascara />
            <View style={styles.iconFace}>
                <Icon name="bug" size={50} color="blue" />
            </View>
            <View style={styles.iconArrowLeft}>
                <Icon name="chevron-left" size={40} color="black" />
            </View>
            {/* <View style={styles.circuloInterior} /> */}
            <Pressable onPress={takePicture} style={styles.boton}>
                <Text style={styles.label}> SNAP </Text>
            </Pressable>
        </View >
    );
}
