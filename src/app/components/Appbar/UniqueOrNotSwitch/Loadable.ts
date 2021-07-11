/**
 *
 * Asynchronously loads the component for UniqueOrNotSwitch
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UniqueOrNotSwitch = lazyLoad(
  () => import('./index'),
  module => module.UniqueOrNotSwitch,
);
