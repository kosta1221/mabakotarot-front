import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  slider1: 'n12',
  slider2: 'ynet',
  slider3: 'walla',
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    setSlider1(state, action: PayloadAction<string>) {
      state.slider1 = action.payload;
    },
    setSlider2(state, action: PayloadAction<string>) {
      state.slider2 = action.payload;
    },
    setSlider3(state, action: PayloadAction<string>) {
      state.slider3 = action.payload;
    },
    setSliderByIndex(
      state,
      action: PayloadAction<{ index: number; site: string }>,
    ) {
      state[`slider${action.payload.index + 1}`] = action.payload.site;
    },
  },
});

export const homepageActions = slice.actions;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
