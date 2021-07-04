import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.slider || initialState;

export const selectSlider = createSelector([selectSlice], state => state);
