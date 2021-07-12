import * as React from 'react';
import { render } from '@testing-library/react';

import { HeadlineBeltPresentor } from '..';

describe('<HeadlineBeltPresentor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<HeadlineBeltPresentor />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
