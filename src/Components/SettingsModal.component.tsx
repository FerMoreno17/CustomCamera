import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { facePosition } from '../Enums/facePosition.enum';
import SliderApp from './SliderApp.component';

interface ModalProps {
    showModal: boolean;
    setShowModal: (state: boolean) => void;
}

export default function SettingsModal({ showModal, setShowModal }: ModalProps) {
    const { width } = Dimensions.get('screen');
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            flex: 1,
            margin: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            padding: 5,
            zIndex: 999,
        },
        buttonClose: {
            backgroundColor: '#2196F3',
            position: 'absolute',
            top: 10,
            right: 10,
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        textContainer: {
        },
        modalText: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom:10,
        },
        fav: {
            backgroundColor: '#2196F3',
            padding: 10,
            position: 'absolute',
            right: 15,
            bottom: 15,
            borderRadius: 100,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    });

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Icon
                                name="times-circle"
                                size={25}
                                color="white" />
                        </Pressable>
                        <View style={styles.textContainer}>
                            <Text style={styles.modalText}>Settings</Text>
                            <ScrollView style={{ width: width * 0.7 }}>
                                <View>
                                    <SliderApp
                                        position={facePosition.Frente}
                                        start={0}
                                        end={10}
                                    />
                                    <SliderApp
                                        position={facePosition.Abajo}
                                        start={20}
                                        end={40}
                                    />
                                    <SliderApp
                                        position={facePosition.Arriba}
                                        start={20}
                                        end={40}
                                    />
                                    <SliderApp
                                        position={facePosition.Izquierda}
                                        start={20}
                                        end={40}
                                    />
                                    <SliderApp
                                        position={facePosition.Derecha}
                                        start={20}
                                        end={40}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal >
            <Pressable
                onPress={() => setShowModal(!showModal)}
                style={styles.fav}
            >
                <Icon
                    name="plus"
                    size={25}
                    color="white" />
            </Pressable>

        </View >
    );
}
