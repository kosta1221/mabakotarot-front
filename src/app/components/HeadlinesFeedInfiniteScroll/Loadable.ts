/**
 *
 * Asynchronously loads the component for HeadlinesFeedInfiniteScroll
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HeadlinesFeedInfiniteScroll = lazyLoad(
  () => import('./index'),
  module => module.HeadlinesFeedInfiniteScroll,
);
