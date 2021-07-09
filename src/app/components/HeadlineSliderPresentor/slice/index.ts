import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { Slider, SlidersState } from './types';

export const initialSliderState: Slider = {
  index: 0,
  showedHeadline: '',
  pickedSite: '',
};

export const initialState: SlidersState = {
  sliders: [initialSliderState],
};

const slice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    setSliders(state, action: PayloadAction<Slider[]>) {
      state.sliders = action.payload;
    },
    setOneSlidersPickedSite(
      state,
      action: PayloadAction<{ index: number; pickedSite: string }>,
    ) {
      state.sliders[action.payload.index].pickedSite =
        action.payload.pickedSite;
    },
    setOneSlidersShowedHeadline(
      state,
      action: PayloadAction<{ index: number; showedHeadline: string }>,
    ) {
      state.sliders[action.payload.index].showedHeadline =
        action.payload.showedHeadline;
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
