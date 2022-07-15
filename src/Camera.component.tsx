/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
import RNFS from 'react-native-fs';
import Mascara from './Mascara.component';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Camera({ navigation }: any) {
    let camera = useRef(null);
    const { width, height } = Dimensions.get('screen');
    const [tomarFoto, setTomarFoto] = useState(true);

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

    //-----------------------------------------------------------
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DownloadDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
            // console.log('GOT RESULT', result[0]);
            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
            if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
            }
            return 'no file';
        })
        .then((contents) => {
            // log the file contents
            // console.log(contents);
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    //---------------------------------------------------------------

    async function takePicture(desafio: string) {
        if (camera) {
            const options: TakePictureOptions = { quality: 0.5, base64: true };
            const data = await camera.current?.takePictureAsync(options);
            await getBase64(data, desafio);
            // navigation.navigate('Preview', { image: data.uri });
        }
    }

    async function getBase64(imageData: any, desafio: string) {
        const filepath = await imageData.uri.split('//')[1];
        const imageUriBase64 = await RNFS.readFile(filepath, 'base64');

        //-----------------------------
        // create a path you want to write to
        // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
        // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

        //mover a otro lado
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hour = date.getTime();
        var temp_date = day + month + year + '_' + hour;
        var temp_name = `${desafio}_${temp_date}`;

        var path = `${RNFS.DownloadDirectoryPath}/${temp_name}.txt`;

        // write the file
        RNFS.writeFile(path, imageUriBase64.toString(), 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!', success);
            })
            .catch((err) => {
                console.log(err.message);
            });
        //----------------------------------------------------------

        return imageUriBase64;
    }

    //probar como reacciona la captura automatica cuando el rostro se mueve rapidamente.

    const handleFaceDetection = ({ faces }: any) => {
        if (tomarFoto && faces && faces[0]) {
            // console.log("--->",JSON.stringify(faces, null, 2));
            // console.log("--->",faces);
            // console.log("Y-->",faces[0].yawAngle +  "\t R-->",faces[0].rollAngle + "\t\t I-->", faces[0].inclinationAngle);

            if (faces[0].inclinationAngle > 20 && faces[0].inclinationAngle < 25) {
                console.log('mirando arriba');
                takePicture('arriba_');
                setTomarFoto(false);
                return;
            }

            if (faces[0].inclinationAngle > -25 && faces[0].inclinationAngle < -20) {
                console.log('mirando abajo');
                takePicture('abajo_');
                setTomarFoto(false);
                return;
            }

            if ((faces[0].yawAngle === 0)) {
                console.log('mirando al frente');
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
            <View style={styles.iconFace}>
                <Icon name="bug" size={50} color="blue" />
            </View>
            <View style={styles.iconArrowLeft}>
                <Icon name="chevron-left" size={40} color="black" />
            </View>
            {/* <View style={styles.circuloInterior} /> */}
            <Pressable onPress={()=>setTomarFoto(true)} style={styles.boton}>
                <Text style={styles.label}> RESET </Text>
            </Pressable>
        </View >
    );
}
