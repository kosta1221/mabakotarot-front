/**
 *
 * Asynchronously loads the component for ComparisonTable
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ComparisonTable = lazyLoad(
  () => import('./index'),
  module => module.ComparisonTable,
);
