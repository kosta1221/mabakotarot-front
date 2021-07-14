/**
 *
 * UniqueOrNotSwitch
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../slice';
import { selectAppbar } from '../slice/selectors';
import { withStyles } from '@material-ui/core/styles';

interface Props {}

const UniqueOrNotSwitchTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function UniqueOrNotSwitch(props: Props) {
  const dispatch = useDispatch();
  const { showUniqueOnly } = useSelector(selectAppbar);

  const handleUniquenessSwitchChange = (e, newShowUniqueOnly: boolean) => {
    dispatch(appbarActions.setShowUniqueOnly(newShowUniqueOnly));
  };

  return (
    <UniqueOrNotSwitchTooltip title="הצג רק כותרות עם שינויים">
      <StyledSwitch
        checked={showUniqueOnly}
        onChange={handleUniquenessSwitchChange}
        name="UniqueOrNotSwitch"
        inputProps={{ 'aria-label': 'unique or not toggle switch' }}
      />
    </UniqueOrNotSwitchTooltip>
  );
}

const StyledSwitch = styled(Switch)`
  direction: ltr;
`;
