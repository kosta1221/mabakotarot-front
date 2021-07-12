import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.gridHeadlinePresentorState || initialState;

export const selectGridHeadlinePresentorState = createSelector(
  [selectSlice],
  state => state,
);
