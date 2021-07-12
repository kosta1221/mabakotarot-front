import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.sliders || initialState;

export const selectSliders = createSelector([selectSlice], state => state);
