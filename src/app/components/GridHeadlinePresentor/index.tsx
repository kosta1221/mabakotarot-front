/**
 *
 * GridHeadlinePresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Loader from 'react-loader-spinner';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import { DateTime } from 'luxon';

import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectHeadlinesFeedInfiniteScroll } from '../HeadlinesFeedInfiniteScroll/slice/selectors';
import { appbarActions } from '../Appbar/slice';
import { appActions } from '../../slice';

interface Props {
  headlines?: Array<any>;
  lastItem?: any;
  isLoading?: boolean;
  isSortAsc?: boolean;
  handleToggleSortingorder?: any;
  comparisonItems?: Array<any>;
}

const CompareTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export function GridHeadlinePresentor(props: Props) {
  const {
    headlines,
    lastItem,
    isLoading,
    isSortAsc,
    handleToggleSortingorder,
    comparisonItems,
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

  const handleAddToCompare = () => {
    dispatch(appActions.setComparisonItems(headlines));
    console.log(comparisonItems);
  };

  const grid = (
    <Grid>
      {headlines?.map((headline, i) => {
        return (
          <GridItem
            ref={headlines.length === i + 1 ? lastItem : null}
            key={headline._id}
          >
            <GridOptions>
              <GridDate>{`${headline.date} ${headline._id.slice(
                20,
              )}`}</GridDate>
              <Divider orientation="vertical" flexItem />
              <AddToCompareButton onClick={handleAddToCompare}>
                <CompareTooltip title="הוספה להשוואת כותרות">
                  <AddCircleOutlineRoundedIcon fontSize="large" />
                </CompareTooltip>
              </AddToCompareButton>
            </GridOptions>
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

      {headlines && headlines.length > 0 && grid}
      {(!headlines || headlines.length === 0) && !isLoading && (
        <CenteredMessage>לא נמצאו כותרות</CenteredMessage>
      )}
      {isLoading && (
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
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
`;

const GridOptions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const AddToCompareButton = styled.div``;

const GridDate = styled.h3``;

const Image = styled.img`
  height: auto;
  width: 100%;
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

const CenteredMessage = styled.h1`
  text-align: center;
`;
