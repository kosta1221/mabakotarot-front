import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ComparisonTableState } from './types';

export const initialState: ComparisonTableState = {
  headlineOneChecked: false,
  headlineTwoChecked: false,
  headlineThreeChecked: false,
};

const slice = createSlice({
  name: 'comparisonTable',
  initialState,
  reducers: {
    setHeadlineOneChecked(state, action: PayloadAction<boolean>) {
      state.headlineOneChecked = action.payload;
    },
    setHeadlineTwoChecked(state, action: PayloadAction<boolean>) {
      state.headlineOneChecked = action.payload;
    },
    setHeadlineThreeChecked(state, action: PayloadAction<boolean>) {
      state.headlineOneChecked = action.payload;
    },
  },
});

export const { actions: comparisonTableActions } = slice;

export const useComparisonTableSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useComparisonTableSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
