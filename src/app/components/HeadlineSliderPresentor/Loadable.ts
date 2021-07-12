/**
 *
 * Asynchronously loads the component for HeadlineSliderPresentor
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HeadlineSliderPresentor = lazyLoad(
  () => import('./index'),
  module => module.HeadlineSliderPresentor,
);
