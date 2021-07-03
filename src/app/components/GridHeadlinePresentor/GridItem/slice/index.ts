import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GridItemState } from './types';

export const initialState: GridItemState = {
  isDialogOpen: false,
  selectedComparison: 1,
};

const slice = createSlice({
  name: 'gridItemState',
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

export const { actions: gridItemStateActions } = slice;

export const useGridItemStateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
