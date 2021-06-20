import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.headlines || initialState;

export const selectHeadlines = createSelector([selectSlice], state => state);
