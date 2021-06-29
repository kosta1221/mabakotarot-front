/* --- STATE --- */
export interface AppbarState {
  isQueryDialogOpen: boolean;
  isDateRange: boolean;
  pickedStartDate: string;
  pickedEndDate: string;
  pickedSites: Array<string>;
}
