import { HomepageState } from 'app/pages/HomePage/slice/types';
import { HeadlinesState } from 'app/pages/HeadlinesPage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  homepage?: HomepageState;
  headlines?: HeadlinesState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
