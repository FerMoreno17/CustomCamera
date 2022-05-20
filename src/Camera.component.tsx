/* eslint-disable prettier/prettier */
import { Pressable, SafeAreaView, Text } from 'react-native'
import React from 'react'

export default function Camera({ navigation }) {
    return (
        <SafeAreaView style={{padding:20}}>
            <Text style={{marginBottom:40}}>Camera</Text>
            <Pressable
                style={{backgroundColor:"blue", borderRadius:10, padding:20, maxWidth:100}}
                onPress={() => navigation.navigate("Preview")}>
                <Text style={{color:"white"}}>Preview</Text>
            </Pressable>
        </SafeAreaView>
    )
}