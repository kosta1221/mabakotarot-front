import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ComparePageState } from './types';

export const initialState: ComparePageState = {
  isSideBySideComparisonOpen: false,
  chosenImages: [],
  isImageGalleryOpen: false,
};

const slice = createSlice({
  name: 'comparePage',
  initialState,
  reducers: {
    setIsSideBySideComparisonOpen(state, action: PayloadAction<boolean>) {
      state.isSideBySideComparisonOpen = action.payload;
    },
    setChosenImages(state, action: PayloadAction<Array<string>>) {
      state.chosenImages = action.payload;
    },
    setIsImageGalleryOpen(state, action: PayloadAction<boolean>) {
      state.isImageGalleryOpen = action.payload;
    },
  },
});

export const { actions: comparePageActions } = slice;

export const useSideBySideComparisonSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSideBySideComparisonSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
