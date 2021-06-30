/**
 *
 * Asynchronously loads the component for SearchBar
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SearchBar = lazyLoad(
  () => import('./index'),
  module => module.SearchBar,
);
