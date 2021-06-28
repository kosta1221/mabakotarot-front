import * as React from 'react';
import { render } from '@testing-library/react';

import { GridHeadlinePresentor } from '..';

describe('<GridHeadlinePresentor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<GridHeadlinePresentor />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
