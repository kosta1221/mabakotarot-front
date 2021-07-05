/* --- STATE --- */

import { Headline } from 'types/Headline';
export interface HeadlinesFeedsState {
  headlineFeeds: HeadlinesFeedInfiniteScroll[];
}

export interface HeadlinesFeedInfiniteScroll {
  index: number;
  headlines: Array<Headline>;
  page: number;
  countPerFetch: number;
  loadMoreHeadlines: boolean;
  isLoading: boolean;
  isFetchError: boolean;
  isSortAsc: boolean;
  sites: string[];
  startDate: string;
  endDate: string;
  isSingularFetch: boolean;
  search: string;
}
