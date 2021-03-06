import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { AppbarState } from './types';
import { currentLocalTime, startOfLocalDay } from 'utils/times';
import { sites } from '../../../../utils/sites';

export const initialState: AppbarState = {
  isQueryDialogOpen: false,
  isDateRange: true,
  pickedStartDate: startOfLocalDay,
  pickedEndDate: currentLocalTime,
  pickedSites: sites,
  searchInput: '',
  isImageGalleryOpen: false,
  indexOfImageToShow: 0,
  indexOfLightBoxToShow: 0,
  showUniqueOnly: true,
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
    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },
    setIsImageGalleryOpen(state, action: PayloadAction<boolean>) {
      state.isImageGalleryOpen = action.payload;
    },
    setIndexOfImageToShow(state, action: PayloadAction<number>) {
      state.indexOfImageToShow = action.payload;
    },
    setIndexOfLightBoxToShow(state, action: PayloadAction<number>) {
      state.indexOfLightBoxToShow = action.payload;
    },
    setShowUniqueOnly(state, action: PayloadAction<boolean>) {
      state.showUniqueOnly = action.payload;
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
