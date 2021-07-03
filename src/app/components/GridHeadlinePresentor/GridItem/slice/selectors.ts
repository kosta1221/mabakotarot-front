import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.gridItemState || initialState;

export const selectGridItemState = createSelector(
  [selectSlice],
  state => state,
);
