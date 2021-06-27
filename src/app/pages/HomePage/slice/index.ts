import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import { HomepageState } from './types';

export const initialState: HomepageState = {
  pickedDate: new Date().toISOString(),
  homepageFeedHeadlines: [],
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    pick(state, action: PayloadAction<string>) {
      state.pickedDate = action.payload;
    },
    setHomePageHeadlines(state, action: PayloadAction<any>) {
      state.homepageFeedHeadlines = action.payload;
    },
  },
});

const sagaGetHomePageHeadlines = createAction('GET_HOMEPAGE_HEADLINES');

export const homepageActions = { ...slice.actions, sagaGetHomePageHeadlines };

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homePageSaga });
  return { actions: slice.actions };
};
