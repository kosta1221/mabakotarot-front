/**
 *
 * SingleDateOrRangeToggle
 *
 */
import * as React from 'react';
// import styled from 'styled-components/macro';

import Switch from '@material-ui/core/Switch';

import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../../slice';
import { selectAppbar } from '../../slice/selectors';

interface Props {}

export function SingleDateOrRangeToggle(props: Props) {
  const dispatch = useDispatch();
  const { isDateRange } = useSelector(selectAppbar);

  const handleDateRangeSwitchChange = (e, newIsDateRange: boolean) => {
    dispatch(appbarActions.setIsDateRange(newIsDateRange));
  };

  return (
    <Switch
      checked={isDateRange}
      onChange={handleDateRangeSwitchChange}
      name="SingleDateOrRangeToggle"
      inputProps={{ 'aria-label': 'single or date range toggle' }}
    />
  );
}

// const Div = styled.div``;
