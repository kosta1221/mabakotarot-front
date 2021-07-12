/**
 *
 * Asynchronously loads the component for HeadlineBeltPresentor
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HeadlineBeltPresentor = lazyLoad(
  () => import('./index'),
  module => module.HeadlineBeltPresentor,
);
