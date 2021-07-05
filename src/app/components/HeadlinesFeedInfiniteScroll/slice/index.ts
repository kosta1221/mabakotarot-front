import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { headlinesFeedInfiniteScrollSaga } from './saga';
import { Headline } from 'types/Headline';
import { HeadlinesFeedsState, HeadlinesFeedInfiniteScroll } from './types';
import { sortByDateAsc, sortByDateDesc } from './utils';

export const initialSingleHeadlineFeedState = {
  index: 0,
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

export const initialState: HeadlinesFeedsState = {
  headlineFeeds: [initialSingleHeadlineFeedState],
};

const slice = createSlice({
  name: 'headlinesFeeds',
  initialState,
  reducers: {
    addHeadlineFeed(state, action: PayloadAction<HeadlinesFeedInfiniteScroll>) {
      state.headlineFeeds.push(action.payload);
    },

    setOneFeedsHeadlines(
      state,
      action: PayloadAction<{ index: number; headlines: Headline[] }>,
    ) {
      state.headlineFeeds[action.payload.index].headlines =
        action.payload.headlines;
    },
    sortOneFeedsHeadlines(
      state,
      action: PayloadAction<{ index: number; isSortAsc: boolean }>,
    ) {
      action.payload.isSortAsc
        ? sortByDateAsc(state.headlineFeeds[action.payload.index].headlines)
        : sortByDateDesc(state.headlineFeeds[action.payload.index].headlines);
    },
    incrementOneFeedsPageByAmount(
      state,
      action: PayloadAction<{ index: number; amount: number }>,
    ) {
      state.headlineFeeds[action.payload.index].page += action.payload.amount;
    },
    setOneFeedsLoadMoreHeadlines(
      state,
      action: PayloadAction<{ index: number; loadMoreHeadlines: boolean }>,
    ) {
      state.headlineFeeds[action.payload.index].loadMoreHeadlines =
        action.payload.loadMoreHeadlines;
    },
    setOneFeedsIsLoading(
      state,
      action: PayloadAction<{ index: number; isLoading: boolean }>,
    ) {
      state.headlineFeeds[action.payload.index].isLoading =
        action.payload.isLoading;
    },
    setOneFeedsIsFetchError(
      state,
      action: PayloadAction<{ index: number; isFetchError: boolean }>,
    ) {
      state.headlineFeeds[action.payload.index].isFetchError =
        action.payload.isFetchError;
    },
    setOneFeedsIsSortAsc(
      state,
      action: PayloadAction<{ index: number; isSortAsc: boolean }>,
    ) {
      state.headlineFeeds[action.payload.index].isSortAsc =
        action.payload.isSortAsc;
    },
    toggleOneFeedsIsSortAsc(state, action: PayloadAction<number>) {
      state.headlineFeeds[action.payload].isSortAsc = !state.headlineFeeds[
        action.payload
      ].isSortAsc;
    },
    setOneFeedsSites(
      state,
      action: PayloadAction<{ index: number; sites: string[] }>,
    ) {
      state.headlineFeeds[action.payload.index].sites = action.payload.sites;
    },
    setOneFeedsCountPerFetch(
      state,
      action: PayloadAction<{ index: number; countPerFetch: number }>,
    ) {
      state.headlineFeeds[action.payload.index].countPerFetch =
        action.payload.countPerFetch;
    },
    setOneFeedsIsSingularFetch(
      state,
      action: PayloadAction<{ index: number; isSingularFetch: boolean }>,
    ) {
      state.headlineFeeds[action.payload.index].isSingularFetch =
        action.payload.isSingularFetch;
    },
    setOneFeedsStartDate(
      state,
      action: PayloadAction<{ index: number; startDate: string }>,
    ) {
      state.headlineFeeds[action.payload.index].startDate =
        action.payload.startDate;
    },
    setOneFeedsEndDate(
      state,
      action: PayloadAction<{ index: number; endDate: string }>,
    ) {
      state.headlineFeeds[action.payload.index].endDate =
        action.payload.endDate;
    },
    setOneFeedsSearch(
      state,
      action: PayloadAction<{ index: number; search: string }>,
    ) {
      state.headlineFeeds[action.payload.index].search = action.payload.search;
    },
  },
});

const sagaGetHeadlinesInfiniteScroll = createAction<number | undefined>(
  'GET_HEADLINES_INFINITE_SCROLL',
);

export const headlinesFeedsActions = {
  ...slice.actions,
  sagaGetHeadlinesInfiniteScroll,
};

export const useHeadlinesFeedsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: headlinesFeedInfiniteScrollSaga });
  return { actions: headlinesFeedsActions };
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
