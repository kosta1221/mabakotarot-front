import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.homepage || initialState;

export const selectHomepage = createSelector([selectSlice], state => state);
