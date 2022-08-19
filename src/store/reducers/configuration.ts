import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import { version } from '../../../package.json';

export type ConfigurationInterface = {
  appearenceMode?: 'light' | 'dark';
};

const initialState: ConfigurationInterface = {
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    saveAppearenceMode(state, action: PayloadAction<undefined | 'light' | 'dark'>) {
      state.appearenceMode = action.payload;
    },
  },
});

export const { saveAppearenceMode } =
  configurationSlice.actions;
export const { name } = configurationSlice;
export default configurationSlice.reducer;
