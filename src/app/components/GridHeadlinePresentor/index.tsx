/**
 *
 * GridHeadlinePresentor
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Loader from 'react-loader-spinner';

import 'react-awesome-lightbox/build/style.css';
import Lightbox from 'react-awesome-lightbox';
import { INDEX_OF_LIGHTBOX_FOR_GRID } from 'utils/constants';
import { AddToCompareDialog } from './AddToCompareDialog/Loadable';
import { GridItem } from './GridItem';

import { DateTime } from 'luxon';

import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../Appbar/slice';
import { selectAppbar } from '../Appbar/slice/selectors';
import { useGridHeadlinePresentorSlice } from './slice';
import { selectDrawer } from '../Drawer/slice/selectors';
import { drawerActions } from '../Drawer/slice';
import { selectGridHeadlinePresentorState } from './slice/selectors';

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
  const { comparisons } = useSelector(selectDrawer);
  const { selectedHeadline } = useSelector(selectGridHeadlinePresentorState);
  const {
    indexOfImageToShow,
    isImageGalleryOpen,
    indexOfLightBoxToShow,
  } = useSelector(selectAppbar);

  // NEED TO FIGURE OUT WHY WE ARE USING THIS
  const { actions } = useGridHeadlinePresentorSlice();

  const pickedStartDateTime = startDate
    ? new DateTime.fromFormat(startDate, 'yyyy-MM-dd HH:mm').setLocale('he')
    : null;
  const pickedStartDatePresentable = pickedStartDateTime
    ? pickedStartDateTime.toFormat('dd MMM yyyy HH:mm')
    : null;

  const pickedEndDateTime = endDate
    ? new DateTime.fromFormat(endDate, 'yyyy-MM-dd HH:mm').setLocale('he')
    : null;
  const pickedEndDatePresentable = pickedEndDateTime
    ? pickedEndDateTime.toFormat('dd MMM yyyy HH:mm')
    : null;

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

  const handleCloseDialog = (comparisonId: number) => {
    // if user pressed on new comparison button
    if (comparisonId === 99) {
      if (comparisons.length > 8) {
        alert('מותר עד 9 השוואות!');
        return;
      }
      const newCompare = {
        id: comparisons.length + 1,
        text: `השוואה חדשה - ${comparisons.length + 1}`,
        headlines: [],
      };

      const newComparisons = [...comparisons, newCompare];
      return dispatch(drawerActions.setComparisons(newComparisons));
    }

    dispatch(actions.setIsDialogOpen(false));
    console.log(comparisonId);
    console.log(
      headlines?.filter(headline => headline._id === selectedHeadline),
    );

    const editedComparison = comparisons.find(
      element => element.id === comparisonId,
    );
    const comparisonWithNewHeadline = {
      id: editedComparison?.id,
      text: editedComparison?.text,
      headlines: [
        ...editedComparison?.headlines,
        headlines?.filter(headline => headline._id === selectedHeadline)[0],
      ],
    };

    const newComparisons = [
      ...comparisons.filter(comparison => comparison.id !== comparisonId),
      comparisonWithNewHeadline,
    ];

    dispatch(drawerActions.setComparisons(newComparisons));
    console.log(comparisons);
  };

  const images = headlines?.map(headline => ({
    url: headline.imageUrl || '',
    title: headline.titleText || '',
  }));

  const handleImageClick = (indexOfImage: number | undefined) => {
    console.log(indexOfImage);
    indexOfImage && dispatch(appbarActions.setIndexOfImageToShow(indexOfImage));
    dispatch(
      appbarActions.setIndexOfLightBoxToShow(INDEX_OF_LIGHTBOX_FOR_GRID),
    );
    dispatch(appbarActions.setIsImageGalleryOpen(true));
  };

  const grid = (
    <Grid>
      {headlines?.map((headline, index) => {
        return (
          <GridItem
            headline={headline}
            lastItem={lastItem}
            index={index}
            key={`GridItem-${index}`}
            handleImageClick={handleImageClick}
          />
        );
      })}
    </Grid>
  );

  return (
    <>
      {isImageGalleryOpen &&
        indexOfLightBoxToShow === INDEX_OF_LIGHTBOX_FOR_GRID && (
          <Lightbox
            images={images}
            startIndex={indexOfImageToShow}
            onClose={() => dispatch(appbarActions.setIsImageGalleryOpen(false))}
          />
        )}
      <AddToCompareDialog
        onClose={comparisonId => handleCloseDialog(comparisonId)}
      />
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
