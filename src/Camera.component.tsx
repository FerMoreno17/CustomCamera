/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { RNCamera } from 'react-native-camera';

export default function Camera({ navigation }) {
    let camera = useRef(null);
    const [box, setBox] = useState(null);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        preview: {
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        capture: {
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
        },
    });
    async function takePicture() {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.current?.takePictureAsync(options);
            navigation.navigate('Preview', { image: data?.uri });
        }
    };

    const handleFaceDetection = ({ faces }: any) => {
        if (faces && faces[0]) {
            console.log("Bounds==>", faces[0].bounds.origin);
            console.log("Size==>", faces[0].bounds.size);
            console.log("Roll==>", faces[0].rollAngle);
            console.log("yaw==>", faces[0].yawAngle);
            console.log("--->",faces);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <RNCamera
                ref={camera}
                style={styles.preview}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                captureAudio={false}
                faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                onFacesDetected={handleFaceDetection}
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
            <View style={
                {
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: 'orange',
                }
            }>
                <Pressable onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
