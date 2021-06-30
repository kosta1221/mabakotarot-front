/**
 *
 * GridHeadlinePresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import Loader from 'react-loader-spinner';
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
  const { startDate, endDate, sites } = useSelector(
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
            ref={headlines.length === i + 1 ? lastItem : null}
            key={headline._id}
          >
            <p>{`${headline.date} ${headline._id.slice(20)}`}</p>
            <Image src={headline.imageUrl} alt={`headline-${i}`} />
          </GridItem>
        );
      })}
    </Grid>
  );

  return (
    <>
      <span onClick={handleToggleSortingorder}>{`סדר  ${
        isSortAsc ? 'עולה' : 'יורד'
      } `}</span>
      <span>{`מתאריך  ${pickedStartDatePresentable} עד ${pickedEndDatePresentable}, `}</span>
      <span>{`אתרים: ${sites.toString()}. `}</span>
      <BlueSpan onClick={handleOpenQueryDialog}>{`שינוי`}</BlueSpan>

      {headlines?.length ? grid : <NotFound>לא נמצאו כותרות</NotFound>}

      {isLoading ? (
        <CenteredLoader type="Oval" color="#00BFFF" height={80} width={80} />
      ) : null}
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  overflow-y: scroll;
`;
const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
`;

const Image = styled.img`
  height: auto;
  width: 40vw;
  align-self: center;
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

const NotFound = styled.h1`
  text-align: center;
`;
