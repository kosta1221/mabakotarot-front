import * as React from 'react';
import { render } from '@testing-library/react';

import { HeadlineSliderPresentor } from '..';

describe('<HeadlineSliderPresentor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<HeadlineSliderPresentor index={0} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
