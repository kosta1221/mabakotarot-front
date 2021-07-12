import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.headlinesFeeds || initialState;

export const selectHeadlinesFeeds = createSelector(
  [selectSlice],
  state => state,
);
