import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.comparisonTable || initialState;

export const selectComparisonTable = createSelector(
  [selectSlice],
  state => state,
);
