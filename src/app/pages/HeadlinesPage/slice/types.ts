/* --- STATE --- */
export interface HeadlinesState {
  headlines: Array<any>;
  page: number;
  loadMoreHeadlines: boolean;
  isLoading: boolean;
}
