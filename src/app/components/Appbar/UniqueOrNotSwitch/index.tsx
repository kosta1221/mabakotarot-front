/**
 *
 * UniqueOrNotSwitch
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import Switch from '@material-ui/core/Switch';

import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../slice';
import { selectAppbar } from '../slice/selectors';

interface Props {}

export function UniqueOrNotSwitch(props: Props) {
  const dispatch = useDispatch();
  const { showUniqueOnly } = useSelector(selectAppbar);

  const handleUniquenessSwitchChange = (e, newShowUniqueOnly: boolean) => {
    dispatch(appbarActions.setShowUniqueOnly(newShowUniqueOnly));
  };

  return (
    <StyledSwitch
      checked={showUniqueOnly}
      onChange={handleUniquenessSwitchChange}
      name="UniqueOrNotSwitch"
      inputProps={{ 'aria-label': 'unique or not toggle switch' }}
    />
  );
}

const StyledSwitch = styled(Switch)`
  direction: ltr;
`;
