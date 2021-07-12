import { HomepageState } from 'app/pages/HomePage/slice/types';
import { AppbarState } from 'app/components/Appbar/slice/types';
import { DrawerState } from 'app/components/Drawer/slice/types';
import { HeadlinesFeedsState } from 'app/components/HeadlinesFeedInfiniteScroll/slice/types';
import { GridHeadlinePresentorState } from 'app/components/GridHeadlinePresentor/slice/types';
import { SlidersState } from 'app/components/HeadlineSliderPresentor/slice/types';
import { ComparePageState } from 'app/pages/ComparePage/slice/types';
import { ComparisonTableState } from 'app/components/ComparisonTable/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  homepage?: HomepageState;
  appbar?: AppbarState;
  drawer?: DrawerState;
  headlinesFeeds?: HeadlinesFeedsState;
  gridHeadlinePresentorState?: GridHeadlinePresentorState;
  sliders?: SlidersState;
  comparePage?: ComparePageState;
  comparisonTable?: ComparisonTableState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
