/* eslint-disable prettier/prettier */
import { Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'

export default function Preview({navigation}) {
    return (
        <SafeAreaView style={{ padding: 20 }}>
            <Text style={{ marginBottom: 40 }}>Preview</Text>
            <Pressable
                style={{ backgroundColor: "red", borderRadius: 10, padding: 20, maxWidth: 100 }}
                onPress={() => navigation.navigate("Camera")}>
                <Text style={{ color: "white" }}>Home</Text>
            </Pressable>
        </SafeAreaView>
    )
}