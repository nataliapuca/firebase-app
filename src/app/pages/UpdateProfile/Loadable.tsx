/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateProfilePage = lazyLoad(
  () => import('./index'),
  module => module.UpdateProfilePage,
);
