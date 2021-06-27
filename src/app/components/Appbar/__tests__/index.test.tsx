import * as React from 'react';
import { render } from '@testing-library/react';

import { Appbar } from '..';

describe('<Appbar  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Appbar />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
