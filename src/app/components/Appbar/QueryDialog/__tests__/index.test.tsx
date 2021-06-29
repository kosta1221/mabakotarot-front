import * as React from 'react';
import { render } from '@testing-library/react';

import { QueryDialog } from '..';

describe('<QueryDialog  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<QueryDialog />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
