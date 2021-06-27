import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { DrawerState } from './types';

export const initialState: DrawerState = {
  isDrawerDisplayed: false,
};

const slice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setIsDrawerDisplayed(state, action: PayloadAction<boolean>) {
      state.isDrawerDisplayed = action.payload;
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
