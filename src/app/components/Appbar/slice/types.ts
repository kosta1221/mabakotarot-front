/* --- STATE --- */
export interface AppbarState {
  isQueryDialogOpen: boolean;
  isDateRange: boolean;
  pickedStartDate: string;
  pickedEndDate: string;
  pickedSites: Array<string>;
  searchInput: string;
  isImageGalleryOpen: boolean;
  indexOfImageToShow: number;
  indexOfLightBoxToShow: number;
}
