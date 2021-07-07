/**
 *
 * Asynchronously loads the component for AddToCompareDialog
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddToCompareDialog = lazyLoad(
  () => import('./index'),
  module => module.AddToCompareDialog,
);
