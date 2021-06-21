import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { headlinesSaga } from './saga';
import { HeadlinesState } from './types';

export const initialState: HeadlinesState = {
  headlines: [],
  page: 1,
  loadMoreHeadlines: true,
  isLoading: false,
};

const slice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {
    setHeadlines(state, action: PayloadAction<any>) {
      state.headlines = action.payload;
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
