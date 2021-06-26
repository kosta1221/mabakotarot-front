import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { headlinesSaga } from './saga';
import { HeadlinesState } from './types';
import { sortByDateAsc, sortByDateDesc } from './utils';

export const initialState: HeadlinesState = {
  headlines: [],
  page: 1,
  loadMoreHeadlines: true,
  isLoading: false,
  isSortAsc: false,
  site: '',
};

const slice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {
    setHeadlines(state, action: PayloadAction<any>) {
      state.headlines = action.payload;
    },
    sortHeadlines(state, action: PayloadAction<boolean>) {
      action.payload
        ? sortByDateAsc(state.headlines)
        : sortByDateDesc(state.headlines);
    },
    incrementPageByAmount(state, action: PayloadAction<number>) {
      state.page += action.payload;
    },
    setLoadMoreHeadlines(state, action: PayloadAction<boolean>) {
      state.loadMoreHeadlines = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsSortAsc(state, action: PayloadAction<boolean>) {
      state.isSortAsc = action.payload;
    },
    toggleIsSortAsc(state) {
      state.isSortAsc = !state.isSortAsc;
    },
    setSite(state, action: PayloadAction<string>) {
      state.site = action.payload;
    },
  },
});

const sagaGetHeadlines = createAction('GET_HEADLINES');

export const headlinesActions = { ...slice.actions, sagaGetHeadlines };

export const useHeadlinesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: headlinesSaga });
  return { actions: headlinesActions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHeadlinesSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
