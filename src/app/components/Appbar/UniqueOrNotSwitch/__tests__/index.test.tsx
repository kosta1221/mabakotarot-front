import * as React from 'react';
import { render } from '@testing-library/react';

import { UniqueOrNotSwitch } from '..';

describe('<SingleDateOrRangeToggle  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UniqueOrNotSwitch />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
