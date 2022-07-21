import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
    frente_values: number[];
    arriba_values: number[];
    abajo_values: number[];
    derecha_values: number[];
    izquierda_values: number[];
}

const initialState: SettingState = {
    frente_values: [],
    arriba_values: [],
    abajo_values: [],
    derecha_values: [],
    izquierda_values: [],
};

export const settingReducer = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setFrenteValues: (state, action: PayloadAction<number[]>) => {
            state.frente_values = action.payload;
        },
        setArribaValues: (state, action: PayloadAction<number[]>) => {
            state.arriba_values = action.payload;
        },
        setAbajoValues: (state, action: PayloadAction<number[]>) => {
            state.abajo_values = action.payload;
        },
        setDerechaValues: (state, action: PayloadAction<number[]>) => {
            state.derecha_values = action.payload;
        },
        setIzquierdaValues: (state, action: PayloadAction<number[]>) => {
            state.izquierda_values = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setFrenteValues,
    setArribaValues,
    setAbajoValues,
    setDerechaValues,
    setIzquierdaValues } = settingReducer.actions;

export default settingReducer.reducer;
