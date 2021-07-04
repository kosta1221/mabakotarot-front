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

import { useSelector, useDispatch } from 'react-redux';
import { selectHeadlinesFeedInfiniteScroll } from '../HeadlinesFeedInfiniteScroll/slice/selectors';
import { appbarActions } from '../Appbar/slice';

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  handleToggleSortingorder?: any;
  comparisonItems?: Array<any>;
  i?: number;
}

export function GridHeadlinePresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
  } = props;

  const dispatch = useDispatch();
  const { startDate, endDate, sites, isFetchError } = useSelector(
    selectHeadlinesFeedInfiniteScroll,
  );

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

  const grid = (
    <Grid>
      {headlines?.map((headline, i) => {
        return (
          <GridItem
            headline={headline}
            lastItem={lastItem}
            i={i}
            key={`GridItem-${i}`}
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
      {sites.length > 0 ? (
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  overflow-y: scroll;
`;

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
