import * as React from 'react';
import { render } from '@testing-library/react';

import { HeadlinesFeedInfiniteScroll } from '..';

describe('<HeadlinesFeedInfiniteScroll  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<HeadlinesFeedInfiniteScroll />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});