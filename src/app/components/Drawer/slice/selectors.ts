import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.drawer || initialState;

export const selectDrawer = createSelector([selectSlice], state => state);
