/* --- STATE --- */
export interface HeadlinesFeedInfiniteScrollState {
  headlines: Array<any>;
  page: number;
  countPerFetch: number;
  loadMoreHeadlines: boolean;
  isLoading: boolean;
  isSortAsc: boolean;
  sites: string[];
  startDate: string;
  endDate: string;
  isSingularFetch: boolean;
  search: string;
}
