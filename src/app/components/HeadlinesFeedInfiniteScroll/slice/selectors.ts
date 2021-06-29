import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.headlinesFeedInfiniteScroll || initialState;

export const selectHeadlinesFeedInfiniteScroll = createSelector(
  [selectSlice],
  state => state,
);
