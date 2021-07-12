/**
 *
 * Asynchronously loads the component for TextScroller
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TextScroller = lazyLoad(
  () => import('./index'),
  module => module.TextScroller,
);
