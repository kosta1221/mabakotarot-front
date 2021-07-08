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

import { ComaprisonTable } from '../../components/ComaprisonTable';
import { useSelector } from 'react-redux';
import { selectDrawer } from '../../components/Drawer/slice/selectors';
import { selectComparePage } from './slice/selectors';
import { drawerActions } from '../../components/Drawer/slice';
import { useSideBySideComparisonSlice } from './slice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {}

export function ComparePage(props: Props) {
  const { comparisons } = useSelector(selectDrawer);
  const { isSideBySideComparisonOpen, chosenImages } = useSelector(
    selectComparePage,
  );

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

  const handleRemoveClick = headline => event => {
    const idToRemove = event.currentTarget.id;

    const headlinesUpdated = comparisonData.headlines.filter(
      item => item._id !== idToRemove,
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
    if (comparisonData?.headlines.length < 2) {
      alert('צריך לפחות 2 כותרות על מנת להשוות תמונות צד לצד זו');
    }
    if (comparisonData?.headlines.length === 2) {
      dispatch(
        actions.setChosenImages([
          comparisonData.headlines[0].imageUrl,
          comparisonData.headlines[1].imageUrl,
        ]),
      );
      dispatch(actions.setIsSideBySideComparisonOpen(true));
      console.log('here');
      console.log(anchorRef);
    }
  };

  const handleClose = () => {
    dispatch(actions.setIsSideBySideComparisonOpen(false));
  };

  const compareDisplay = (
    <CompareContainer ref={anchorRef}>
      <Title>{comparisonData?.text}</Title>
      <CompareTools>
        <ToolButton onClick={handleCompareClick}>
          <CompareIcon />
        </ToolButton>
        <ToolButton>
          <FullscreenIcon />
        </ToolButton>
        <ToolButton></ToolButton>
        <ToolButton></ToolButton>
      </CompareTools>
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
      <ComaprisonTable comparisonData={comparisonData} />
    </CompareContainer>
  );

  return (
    <>{comparisonData ? compareDisplay : <Title>השוואה לא נמצאה</Title>}</>
  );
}

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
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
