import * as React from 'react';
import { render } from '@testing-library/react';

import { SitesSelectionGroup } from '..';

describe('<SitesSelectionGroup  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SitesSelectionGroup />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
