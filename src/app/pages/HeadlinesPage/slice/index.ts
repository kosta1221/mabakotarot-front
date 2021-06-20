import { PayloadAction, createAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { headlinesSaga } from './saga';
import { HeadlinesState } from './types';

export const initialState: HeadlinesState = {
  headlines: [],
};

const slice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {
    setHeadlines(state, action: PayloadAction<any>) {
      state.headlines = action.payload;
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
