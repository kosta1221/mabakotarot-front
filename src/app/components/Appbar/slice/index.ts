import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { AppbarState } from './types';
import { DateTime } from 'luxon';
import { sites } from '../../../../utils/sites';

export const initialState: AppbarState = {
  isQueryDialogOpen: false,
  isDateRange: true,
  pickedStartDate: new DateTime(DateTime.local()).toFormat('yyyy-MM-dd HH:mm'),
  pickedEndDate: new DateTime(DateTime.local()).toFormat('yyyy-MM-dd HH:mm'),
  pickedSites: sites,
};

const slice = createSlice({
  name: 'appbar',
  initialState,
  reducers: {
    setIsQueryDialogOpen(state, action: PayloadAction<boolean>) {
      state.isQueryDialogOpen = action.payload;
    },
    setIsDateRange(state, action: PayloadAction<boolean>) {
      state.isDateRange = action.payload;
    },
    setPickedStartDate(state, action: PayloadAction<string>) {
      state.pickedStartDate = action.payload;
    },
    setPickedEndDate(state, action: PayloadAction<string>) {
      state.pickedEndDate = action.payload;
    },
    setPickedSites(state, action: PayloadAction<Array<string>>) {
      state.pickedSites = action.payload;
    },
  },
});

export const { actions: appbarActions } = slice;

export const useAppbarSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAppbarSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
