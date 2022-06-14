/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, Pressable, Image } from 'react-native';
import React from 'react';

export default function Preview({navigation, route}) {
    const {image} = route.params;

    return (
        <SafeAreaView style={{ padding: 20 }}>
            <Text style={{ marginBottom: 40 }}>Preview</Text>
            <Image source={{uri:image}} style={{width:200, height:200}}/>
            <Pressable
                style={{ backgroundColor: 'red', borderRadius: 10, padding: 20, maxWidth: 100 }}
                onPress={() => navigation.navigate('Camera')}>
                <Text style={{ color: 'white' }}>Home</Text>
            </Pressable>
        </SafeAreaView>
    );
}
