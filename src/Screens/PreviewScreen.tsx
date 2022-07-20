import { Text, SafeAreaView, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function PreviewScreen({ route }: any) {
    const navigation = useNavigation();
    const { image } = route.params;

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        title: {
            marginBottom: 40,
        },
        image: {
            width: 200,
            height: 200,
        },
        button: {
            backgroundColor: 'red',
            borderRadius: 10,
            padding: 20,
            maxWidth: 100,
        },
        label: {
            color: 'white',
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Preview</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.label}>Volver</Text>
            </Pressable>
        </SafeAreaView>
    );
}
