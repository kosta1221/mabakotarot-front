/* --- STATE --- */
export interface SlidersState {
  sliders: Slider[];
}

export interface Slider {
  index: number;
  showedHeadline: string;
  pickedSite: string;
}
