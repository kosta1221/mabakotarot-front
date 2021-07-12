import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { DrawerState } from './types';

import { getComparisonsFromLocalStorage } from 'utils/localStorage';

export const initialState: DrawerState = {
  isDrawerDisplayed: false,
  isComparisonOpen: true,
  comparisons: getComparisonsFromLocalStorage() || [],
  editing: false,
};

const slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setIsDrawerDisplayed(state, action: PayloadAction<boolean>) {
      state.isDrawerDisplayed = action.payload;
    },
    setIsComparisonOpen(state, action: PayloadAction<boolean>) {
      state.isComparisonOpen = action.payload;
    },
    setComparisons(state, action: PayloadAction<Array<any>>) {
      state.comparisons = action.payload;
    },
    setEditing(state, action: PayloadAction<boolean>) {
      state.editing = action.payload;
    },
  },
});

export const { actions: drawerActions } = slice;

export const useDrawerSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useDrawerSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
