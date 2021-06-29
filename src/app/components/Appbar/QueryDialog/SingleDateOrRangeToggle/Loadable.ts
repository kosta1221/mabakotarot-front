/**
 *
 * Asynchronously loads the component for SingleDateOrRangeToggle
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SingleDateOrRangeToggle = lazyLoad(
  () => import('./index'),
  module => module.SingleDateOrRangeToggle,
);
