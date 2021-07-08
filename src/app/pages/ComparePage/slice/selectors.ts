import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.comparePage || initialState;

export const selectComparePage = createSelector([selectSlice], state => state);
