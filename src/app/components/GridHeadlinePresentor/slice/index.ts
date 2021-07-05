import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GridHeadlinePresentorState } from './types';

export const initialState: GridHeadlinePresentorState = {
  isDialogOpen: false,
  selectedComparison: 1,
};

const slice = createSlice({
  name: 'gridHeadlinePresentorState',
  initialState,
  reducers: {
    setIsDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    },
    setSelectedComparison(state, action: PayloadAction<number>) {
      state.selectedComparison = action.payload;
    },
  },
});

export const { actions: gridHeadlinePresentorActions } = slice;

export const useGridHeadlinePresentorSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
