/**
 *
 * ComparePage
 *
 */
import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components/macro';
import queryString from 'query-string';

import CompareIcon from '@material-ui/icons/Compare';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Popover from '@material-ui/core/Popover';
import ReactCompareImage from 'react-compare-image';
import DeleteIcon from '@material-ui/icons/Delete';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

import { ComaprisonTable } from '../../components/ComaprisonTable';
import { useSelector } from 'react-redux';
import { selectDrawer } from '../../components/Drawer/slice/selectors';
import { selectComparePage } from './slice/selectors';
import { drawerActions } from '../../components/Drawer/slice';
import { selectComparisonTable } from '../../components/ComaprisonTable/slice/selectors';
import { useSideBySideComparisonSlice } from './slice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {}

export function ComparePage(props: Props) {
  const { comparisons } = useSelector(selectDrawer);
  const {
    isSideBySideComparisonOpen,
    chosenImages,
    isImageGalleryOpen,
  } = useSelector(selectComparePage);
  const {
    headlineOneChecked,
    headlineTwoChecked,
    headlineThreeChecked,
  } = useSelector(selectComparisonTable);

  const { actions } = useSideBySideComparisonSlice();
  const dispatch = useDispatch();

  const anchorRef = useRef(null);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const id = Number(queryParams.id);
  const comparisonData =
    comparisons?.length > 0
      ? comparisons.find(comparison => {
          return comparison.id === id;
        })
      : null;

  const handleRemoveClick = () => {
    const headlinesToRemoveNum = [
      headlineOneChecked ? 1 : null,
      headlineTwoChecked ? 2 : null,
      headlineThreeChecked ? 3 : null,
    ];

    const headlinesUpdated = comparisonData.headlines.filter(
      (headline, i) => !headlinesToRemoveNum.includes(i + 1),
    );

    const comparisonNewHeadlines = {
      id: comparisonData?.id,
      text: comparisonData?.text,
      headlines: headlinesUpdated,
    };

    const newComparisons = [
      ...comparisons.filter(comparison => comparison.id !== id),
      comparisonNewHeadlines,
    ];
    dispatch(drawerActions.setComparisons(newComparisons));
  };

  const handleCompareClick = () => {
    const selectedHeadlinesBool = [
      headlineOneChecked,
      headlineTwoChecked,
      headlineThreeChecked,
    ];

    //converts the boolean array to the correct selected indices
    const selectedHeadlinesIndices = selectedHeadlinesBool.flatMap(
      (bool, index) => (bool ? index : []),
    );

    if (comparisonData?.headlines.length < 2) {
      alert('צריך לפחות 2 כותרות על מנת להשוות תמונות צד לצד זו');
      return;
    }
    if (comparisonData?.headlines.length === 2) {
      dispatch(
        actions.setChosenImages([
          comparisonData.headlines[0].imageUrl,
          comparisonData.headlines[1].imageUrl,
        ]),
      );
      dispatch(actions.setIsSideBySideComparisonOpen(true));
      return;
    }
    if (selectedHeadlinesIndices.length > 2) {
      alert('ניתן להשוות רק 2 תמונות זו לצד זו! הורד סימון מאחת הכותרות');
      return;
    } else if (selectedHeadlinesIndices.length < 2) {
      alert('על מנת ליצור השוואת תמונות זו לצד זו, סמן 2 כותרות');
      return;
    }

    dispatch(
      actions.setChosenImages([
        comparisonData.headlines[selectedHeadlinesIndices[0]].imageUrl,
        comparisonData.headlines[selectedHeadlinesIndices[1]].imageUrl,
      ]),
    );
    dispatch(actions.setIsSideBySideComparisonOpen(true));
  };

  const handleClose = () => {
    dispatch(actions.setIsSideBySideComparisonOpen(false));
  };

  const handleGalleryClick = () => {
    dispatch(actions.setIsImageGalleryOpen(true));
  };

  const images = [
    {
      url: comparisonData?.headlines[0]?.imageUrl || '',
      title: comparisonData?.headlines[0]?.titleText || '',
    },
    {
      url: comparisonData?.headlines[1]?.imageUrl || '',
      title: comparisonData?.headlines[1]?.titleText || '',
    },
    {
      url: comparisonData?.headlines[2]?.imageUrl || '',
      title: comparisonData?.headlines[2]?.titleText || '',
    },
  ].filter(item => item.url !== '');

  const compareDisplay = (
    <CompareContainer ref={anchorRef}>
      <CenteredMessage>{comparisonData?.text}</CenteredMessage>
      <CompareTools>
        <ToolButton onClick={handleCompareClick}>
          <CompareIcon />
        </ToolButton>
        <ToolButton onClick={handleGalleryClick}>
          <FullscreenIcon />
        </ToolButton>
        <ToolButton onClick={handleRemoveClick}>
          <DeleteIcon />
        </ToolButton>
        <ToolButton></ToolButton>
      </CompareTools>

      {isImageGalleryOpen && (
        <Lightbox
          images={images}
          onClose={() => dispatch(actions.setIsImageGalleryOpen(false))}
        />
      )}

      <Popover
        open={isSideBySideComparisonOpen}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SideBySideContainer>
          <StyledReactCompareImage
            leftImage={chosenImages[0]}
            rightImage={chosenImages[1]}
          />
        </SideBySideContainer>
      </Popover>
      {comparisonData?.headlines.length > 0 ? (
        <ComaprisonTable comparisonData={comparisonData} />
      ) : (
        <CenteredMessage>אין כותרות להציג</CenteredMessage>
      )}
    </CompareContainer>
  );

  return (
    <>
      {comparisonData ? (
        compareDisplay
      ) : (
        <CenteredMessage>השוואה לא נמצאה</CenteredMessage>
      )}
    </>
  );
}

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CompareTools = styled.div`
  display: flex;
  width: 35vw;
  margin: auto;
  justify-content: space-around;
`;

const ToolButton = styled.button`
  width: 4vw;
  height: 4vh;
`;

const SideBySideContainer = styled.div`
  width: 1536px;
  height: 754px;
`;

const StyledReactCompareImage = styled(ReactCompareImage)`
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
`;

const CenteredMessage = styled.h1`
  text-align: center;
`;
