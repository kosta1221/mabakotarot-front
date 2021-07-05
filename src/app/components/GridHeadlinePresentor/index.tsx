/**
 *
 * GridHeadlinePresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Loader from 'react-loader-spinner';
import { GridItem } from './GridItem';

import { DateTime } from 'luxon';

import { useDispatch } from 'react-redux';
import { appbarActions } from '../Appbar/slice';
import { useGridHeadlinePresentorSlice } from './slice';

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  startDate?: string;
  endDate?: string;
  sites?: any[];
  isFetchError?: boolean;
  handleToggleSortingorder?: any;
  comparisonItems?: Array<any>;
  cols?: number;
}

export function GridHeadlinePresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
    startDate,
    endDate,
    sites,
    isFetchError,
    cols,
  } = props;

  const dispatch = useDispatch();

  // NEED TO FIGURE OUT WHY WE ARE USING THIS
  useGridHeadlinePresentorSlice();

  const pickedStartDateTime = new DateTime.fromFormat(
    startDate,
    'yyyy-MM-dd HH:mm',
  ).setLocale('he');
  const pickedStartDatePresentable = pickedStartDateTime.toFormat(
    'dd MMM yyyy HH:mm',
  );

  const pickedEndDateTime = new DateTime.fromFormat(
    endDate,
    'yyyy-MM-dd HH:mm',
  ).setLocale('he');
  const pickedEndDatePresentable = pickedEndDateTime.toFormat(
    'dd MMM yyyy HH:mm',
  );

  const handleOpenQueryDialog = () => {
    dispatch(appbarActions.setIsQueryDialogOpen(true));
  };

  const gridCols = '1fr '.repeat(cols || 2);
  const Grid = styled.div`
    display: grid;
    grid-template-columns: ${gridCols};
    grid-gap: 1vw;
    /* overflow-y: scroll; */
  `;

  const grid = (
    <Grid>
      {headlines?.map((headline, index) => {
        return (
          <GridItem
            headline={headline}
            lastItem={lastItem}
            index={index}
            key={`GridItem-${index}`}
          />
        );
      })}
    </Grid>
  );

  return (
    <>
      <span onClick={handleToggleSortingorder}>{`סדר  ${
        isSortAsc ? 'עולה' : 'יורד'
      }, `}</span>
      {startDate && endDate && (
        <span>{`מתאריך  ${pickedStartDatePresentable} עד ${pickedEndDatePresentable}, `}</span>
      )}
      {sites && sites.length > 0 ? (
        <span>{`אתרים: ${sites.toString()}. `}</span>
      ) : (
        <span>{`כל האתרים. `}</span>
      )}

      <BlueSpan onClick={handleOpenQueryDialog}>{`שינוי`}</BlueSpan>

      {isFetchError && <CenteredMessage>אירעה שגיאת רשת</CenteredMessage>}

      {headlines && headlines.length > 0 && grid}
      {(!headlines || headlines.length === 0) && !isLoading && (
        <CenteredMessage>לא נמצאו כותרות</CenteredMessage>
      )}
      {isLoading && !isFetchError && (
        <CenteredLoader type="Oval" color="#00BFFF" height={80} width={80} />
      )}
    </>
  );
}

const CenteredLoader = styled(Loader)`
  display: flex;
  justify-content: center;
`;

const BlueSpan = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const CenteredMessage = styled.h1`
  text-align: center;
`;
