import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GridHeadlinePresentorState } from './types';

export const initialState: GridHeadlinePresentorState = {
  isDialogOpen: false,
  selectedHeadline: '',
};

const slice = createSlice({
  name: 'gridHeadlinePresentorState',
  initialState,
  reducers: {
    setIsDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    },
    setSelectedHeadline(state, action: PayloadAction<string>) {
      state.selectedHeadline = action.payload;
    },
  },
});

export const { actions: gridHeadlinePresentorActions } = slice;

export const useGridHeadlinePresentorSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
