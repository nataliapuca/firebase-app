/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const LogInPage = lazyLoad(
  () => import('./index'),
  module => module.LogInPage,
);
