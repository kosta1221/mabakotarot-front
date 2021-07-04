/**
 *
 * Asynchronously loads the component for ComparePage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ComparePage = lazyLoad(
  () => import('./index'),
  module => module.ComparePage,
);
