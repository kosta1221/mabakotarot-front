import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { headlinesFeedInfiniteScrollSaga } from './saga';
import { HeadlinesFeedInfiniteScrollState } from './types';
import { sortByDateAsc, sortByDateDesc } from './utils';

export const initialState: HeadlinesFeedInfiniteScrollState = {
  headlines: [],
  page: 1,
  countPerFetch: 5,
  loadMoreHeadlines: true,
  isLoading: false,
  isFetchError: false,
  isSortAsc: false,
  sites: [],
  startDate: '',
  endDate: '',
  isSingularFetch: false,
  search: '',
};

const slice = createSlice({
  name: 'headlinesFeedInfiniteScroll',
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
    setItFetchError(state, action: PayloadAction<boolean>) {
      state.isFetchError = action.payload;
    },
    setIsSortAsc(state, action: PayloadAction<boolean>) {
      state.isSortAsc = action.payload;
    },
    toggleIsSortAsc(state) {
      state.isSortAsc = !state.isSortAsc;
    },
    setSites(state, action: PayloadAction<string[]>) {
      state.sites = action.payload;
    },
    setCountPerFetch(state, action: PayloadAction<number>) {
      state.countPerFetch = action.payload;
    },
    setIsSingularFetch(state, action: PayloadAction<boolean>) {
      state.isSingularFetch = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

const sagaGetHeadlinesInfiniteScroll = createAction(
  'GET_HEADLINES_INFINITE_SCROLL',
);

export const headlinesFeedInfiniteScrollActions = {
  ...slice.actions,
  sagaGetHeadlinesInfiniteScroll,
};

export const useHeadlinesFeedInfiniteScrollSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: headlinesFeedInfiniteScrollSaga });
  return { actions: headlinesFeedInfiniteScrollActions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHeadlinesFeedInfiniteScrollSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
