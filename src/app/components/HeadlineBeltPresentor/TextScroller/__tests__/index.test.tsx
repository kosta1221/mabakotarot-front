import * as React from 'react';
import { render } from '@testing-library/react';

import { TextScroller } from '..';

describe('<TextScroller  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TextScroller />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
