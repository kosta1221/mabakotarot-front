import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.appbar || initialState;

export const selectAppbar = createSelector([selectSlice], state => state);
