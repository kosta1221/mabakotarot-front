import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { SliderState } from './types';

export const initialState: SliderState = {
  showedHeadline: '',
};

const slice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setShowedHeadline(state, action: PayloadAction<string>) {
      state.showedHeadline = action.payload;
    },
  },
});

export const { actions: sliderActions } = slice;

export const useSliderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSliderSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
