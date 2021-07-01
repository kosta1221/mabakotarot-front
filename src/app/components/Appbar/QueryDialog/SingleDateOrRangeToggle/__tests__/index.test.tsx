import * as React from 'react';
import { render } from '@testing-library/react';

import { SingleDateOrRangeToggle } from '..';

describe('<SingleDateOrRangeToggle  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SingleDateOrRangeToggle />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
