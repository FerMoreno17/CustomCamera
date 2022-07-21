/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { getSlidersSettings, storageSlidersSettings } from '../Helpers/storageHelper';
import { facePosition } from '../Enums/facePosition.enum';
import { SliderSetting } from '../Models/SliderSetting.model';

interface SliderProps {
    start: number;
    end: number;
    position?: facePosition;
}

export default function SliderApp({ start, end, position }: SliderProps) {
    const [sliderValue, setSliderValue] = useState([start, end]);
    const { width } = Dimensions.get('screen');

    useEffect(() => {
        getIndividualStorage();
    }, []);

    async function handleChangeValue(values: number[]) {
        console.log({ values });
        setSliderValue(values);
        await setIndividualStorage(values);
    }

    async function setIndividualStorage(values: number[]) {
        const temp = new SliderSetting(
            {
                gesture: position,
                valueStart: values[0],
                valueEnd: values[1],
            });
        await storageSlidersSettings(temp);
    }

    async function getIndividualStorage() {
        const response = await getSlidersSettings(position);
        if (response) {
            setSliderValue([response.valueStart!, response.valueEnd!]);
        }
    }

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#F3FAFF',
            marginBottom:10,
            padding:10,
        },
        label: {
            fontSize: 16,
            alignSelf: 'flex-start',
            position:'absolute',
            top:2,
            left:10,
            color:'black',
        },
        textStart: {
            flex: 1,
            textAlign: 'left',
            color:'black',
        },
        textEnd: {
            flex: 1,
            textAlign: 'right',
            color:'black',
        },
        row: {
            flexDirection: 'row',
            position:'absolute',
            bottom:6,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {position}
            </Text>
            <MultiSlider
                values={[
                    sliderValue[0],
                    sliderValue[1],
                ]}
                sliderLength={width * 0.6}
                onValuesChange={handleChangeValue}
                min={start}
                max={end}
                step={1}
                allowOverlap={false}
                snapped
                minMarkerOverlapDistance={40}
                markerStyle={{backgroundColor:'#2196F3'}}
                selectedStyle={{backgroundColor:'#2196F3'}}
            />
            <View style={styles.row}>
                <Text style={styles.textStart}>{sliderValue[0]} </Text>
                <Text style={styles.textEnd}>{sliderValue[1]}</Text>
            </View>
        </View>
    );
}
