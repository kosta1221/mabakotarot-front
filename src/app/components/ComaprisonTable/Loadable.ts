/**
 *
 * Asynchronously loads the component for ComaprisonTable
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ComaprisonTable = lazyLoad(
  () => import('./index'),
  module => module.ComaprisonTable,
);
