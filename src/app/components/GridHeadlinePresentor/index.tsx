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
import { sitesLogos, sites as allSites } from 'utils/sites';
import { useDispatch, useSelector } from 'react-redux';
import { appbarActions } from '../Appbar/slice';
import { selectAppbar } from '../Appbar/slice/selectors';
import { useGridHeadlinePresentorSlice } from './slice';
import { selectDrawer } from '../Drawer/slice/selectors';
import { drawerActions } from '../Drawer/slice';
import { selectGridHeadlinePresentorState } from './slice/selectors';
import { turnDateStringIntoPresentableFormat } from 'utils/luxon';

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

  const { actions } = useGridHeadlinePresentorSlice();

  const pickedStartDatePresentable = startDate
    ? turnDateStringIntoPresentableFormat(startDate, true)
    : null;

  const pickedEndDatePresentable = endDate
    ? turnDateStringIntoPresentableFormat(endDate, true)
    : null;

  const handleOpenQueryDialog = () => {
    dispatch(appbarActions.setIsQueryDialogOpen(true));
  };

  const gridCols = '1fr '.repeat(cols || 2);
  const gridColsMobile = '1fr '.repeat(cols || 1);
  const Grid = styled.div`
    display: grid;
    grid-template-columns: ${gridCols};
    grid-gap: 1vw;

    @media (max-width: 768px) {
      grid-template-columns: ${gridColsMobile};
    }
  `;

  const handleCloseDialog = (comparisonId: number) => {
    // if user pressed on new comparison button
    if (comparisonId === 99) {
      if (comparisons.length > 8) {
        alert('???????? ???? 9 ??????????????!');
        return;
      }
      const newCompare = {
        id: comparisons.length + 1,
        text: `???????????? ???????? - ${comparisons.length + 1}`,
        headlines: [],
      };

      const newComparisons = [...comparisons, newCompare];
      return dispatch(drawerActions.setComparisons(newComparisons));
    }

    dispatch(actions.setIsDialogOpen(false));

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
  };

  const images = headlines?.map(headline => ({
    url: headline.imageUrl || '',
    title:
      `${turnDateStringIntoPresentableFormat(headline.date, true)}: ${
        headline.titleText
      }` || '',
  }));

  const handleImageClick = (indexOfImage: number | undefined) => {
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
            reverseIndex={headlines.length - 1 - index}
          />
        );
      })}
    </Grid>
  );

  return (
    <Div>
      {isImageGalleryOpen &&
        indexOfLightBoxToShow === INDEX_OF_LIGHTBOX_FOR_GRID && (
          <LightboxContainer>
            <Lightbox
              buttonAlign="flex-start"
              images={images?.reverse()}
              startIndex={
                headlines && indexOfImageToShow < headlines?.length
                  ? indexOfImageToShow
                  : 0
              }
              onClose={() =>
                dispatch(appbarActions.setIsImageGalleryOpen(false))
              }
            ></Lightbox>
            <ArticleLinkInLightbox
              href={
                headlines && indexOfImageToShow < headlines?.length
                  ? headlines[headlines.length - 1 - indexOfImageToShow]
                      ?.titleArticleLink
                  : 'test'
              }
              target="_blank"
            >
              ?????????? ??????????
            </ArticleLinkInLightbox>
          </LightboxContainer>
        )}
      <AddToCompareDialog
        onClose={comparisonId => handleCloseDialog(comparisonId)}
      />

      <OrderAndSitesContainer>
        <OrderAndSitesTextContainer>
          <OrderAndSitesText onClick={handleToggleSortingorder}>{`??????  ${
            isSortAsc ? '????????' : '????????'
          }, `}</OrderAndSitesText>
          {startDate && endDate && (
            <OrderAndSitesText>{`????????????  ${pickedStartDatePresentable} ???? ${pickedEndDatePresentable}, `}</OrderAndSitesText>
          )}
          <SitesDisplayedText>??????????:</SitesDisplayedText>
        </OrderAndSitesTextContainer>
        {sites && sites.length > 0 ? (
          <SitesAndChangeContainer>
            {sites.map(site => (
              <SiteLogo src={sitesLogos[site]} alt={site} />
            ))}
            <BlueSpan onClick={handleOpenQueryDialog}>{`??????????`}</BlueSpan>
          </SitesAndChangeContainer>
        ) : (
          <SitesAndChangeContainer>
            {allSites.map(site => (
              <SiteLogo src={sitesLogos[site]} alt={site} />
            ))}
            <BlueSpan onClick={handleOpenQueryDialog}>{`??????????`}</BlueSpan>
          </SitesAndChangeContainer>
        )}
      </OrderAndSitesContainer>

      {isFetchError && <CenteredMessage>?????????? ?????????? ??????</CenteredMessage>}

      {headlines && headlines.length > 0 && grid}
      {(!headlines || headlines.length === 0) && !isLoading && (
        <CenteredMessage>???? ?????????? ????????????</CenteredMessage>
      )}
      {isLoading && !isFetchError && (
        <CenteredLoader type="Oval" color="#00BFFF" height={80} width={80} />
      )}
    </Div>
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

const Div = styled.div`
  & .lb-container {
    direction: ltr;
  }

  & .lb-title {
    direction: rtl;
  }
`;

const ArticleLinkInLightbox = styled.a`
  z-index: 100000;
  border: 1px solid white;
  position: fixed;
  top: 10%;
  right: 45vw;
  font-size: 1.3rem;
  color: white;
  background: black;
  padding: 2px;
  min-width: 8vw;
  text-align: center;
`;

const OrderAndSitesTextContainer = styled.div`
  display: flex;
`;

const LightboxContainer = styled.div``;

const OrderAndSitesContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1vw;
  margin-top: 1vh;
  font-size: 1rem;
  height: 50px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const SitesAndChangeContainer = styled.div`
  display: inline-block;
  margin-right: 2vw;
`;

const SiteLogo = styled.img`
  height: 30px;
  margin-left: 2vw;

  @media (max-width: 1400px) {
    height: 20px;
  }

  @media (max-width: 1190px) {
    height: 15px;
  }

  @media (max-width: 1100px) {
    height: 20px;
  }

  @media (max-width: 600px) {
    height: 15px;
  }
  @media (max-width: 440px) {
    height: 12px;
  }
`;

const OrderAndSitesText = styled.p`
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0px;
  margin-left: 0.5vw;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 450px) {
    font-size: 0.75rem;
  }
`;

const SitesDisplayedText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
`;
