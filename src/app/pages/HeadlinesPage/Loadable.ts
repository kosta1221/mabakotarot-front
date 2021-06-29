/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const HeadlinesPage = lazyLoad(
  () => import('./index'),
  module => module.HeadlinesPage,
);
