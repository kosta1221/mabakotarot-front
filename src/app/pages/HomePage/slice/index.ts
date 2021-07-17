import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { HomepageState } from './types';
import { currentLocalTime, startOfLocalDay } from 'utils/times';

export const initialState: HomepageState = {
  slider1: 'n12',
  slider2: 'ynet',
  slider1StartDate: startOfLocalDay,
  slider1EndDate: currentLocalTime,
  slider2StartDate: startOfLocalDay,
  slider2EndDate: currentLocalTime,
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
    setSlider1StartDate(state, action: PayloadAction<string>) {
      state.slider1StartDate = action.payload;
    },
    setSlider1EndDate(state, action: PayloadAction<string>) {
      state.slider1EndDate = action.payload;
    },
    setSlider2StartDate(state, action: PayloadAction<string>) {
      state.slider2StartDate = action.payload;
    },
    setSlider2EndDate(state, action: PayloadAction<string>) {
      state.slider2EndDate = action.payload;
    },
    setSliderByIndex(
      state,
      action: PayloadAction<{ index: number; site: string }>,
    ) {
      state[`slider${action.payload.index + 1}`] = action.payload.site;
    },
    setSliderStartDateByIndex(
      state,
      action: PayloadAction<{ index: number; startDate: string }>,
    ) {
      state[`slider${action.payload.index + 1}StartDate`] =
        action.payload.startDate;
    },
    setSlidersEndDateByIndex(
      state,
      action: PayloadAction<{ index: number; endDate: string }>,
    ) {
      state[`slider${action.payload.index + 1}EndDate`] =
        action.payload.endDate;
    },
  },
});

export const homepageActions = slice.actions;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
