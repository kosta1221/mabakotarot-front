import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  pickedDate: new Date().toISOString(),
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    pick(state, action: PayloadAction<string>) {
      state.pickedDate = action.payload;
    },
  },
});

export const { actions: homepageActions } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomepageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
