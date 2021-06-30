import { HomepageState } from 'app/pages/HomePage/slice/types';
import { AppbarState } from 'app/components/Appbar/slice/types';
import { DrawerState } from 'app/components/Drawer/slice/types';
import { HeadlinesFeedInfiniteScrollState } from 'app/components/HeadlinesFeedInfiniteScroll/slice/types';
import { AppState } from 'app//slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  homepage?: HomepageState;
  appbar?: AppbarState;
  drawer?: DrawerState;
  headlinesFeedInfiniteScroll?: HeadlinesFeedInfiniteScrollState;
  app?: AppState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
