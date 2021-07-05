import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { Slider, SlidersState } from './types';

export const initialState: SlidersState = {
  sliders: [{ index: 0, showedHeadline: '' }],
};

const slice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    setSliders(state, action: PayloadAction<Slider[]>) {
      state.sliders = action.payload;
    },
    setSlider(state, action: PayloadAction<Slider>) {
      state.sliders = [
        action.payload,
        ...state.sliders.filter(
          slider => slider.index !== action.payload.index,
        ),
      ];
    },
    removeSlider(state, action: PayloadAction<number>) {
      state.sliders = [
        ...state.sliders.filter(slider => slider.index !== action.payload),
      ];
    },
  },
});

export const { actions: slidersActions } = slice;

export const useSlidersSlice = () => {
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
