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
import ReactCompareImage from 'react-compare-image';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

import { useRouter } from '../../../utils/useRouter';
import { ComparisonTable } from '../../components/ComparisonTable';
import { useSelector } from 'react-redux';
import { selectDrawer } from '../../components/Drawer/slice/selectors';
import { selectComparePage } from './slice/selectors';
import { drawerActions } from '../../components/Drawer/slice';
import { selectComparisonTable } from '../../components/ComparisonTable/slice/selectors';
import { useSideBySideComparisonSlice } from './slice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

interface Props {}

const ButtonsTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'black',
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

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

  const router = useRouter();
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

  const handleCompareClick = event => {
    event.stopPropagation();
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

  const handleClose = event => {
    dispatch(actions.setIsSideBySideComparisonOpen(false));
  };

  const handleGalleryClick = () => {
    dispatch(actions.setIsImageGalleryOpen(true));
  };

  const handleDeleteComparison = () => {
    const newComparisons = comparisons.filter(
      comparison => comparison !== comparisonData,
    );

    dispatch(drawerActions.setComparisons(newComparisons));
    router.push('/');
    router.history.go(0);
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
    <CompareContainer ref={anchorRef} onClick={event => handleClose(event)}>
      <TitleAndDeleteArea>
        <CenteredMessage>{comparisonData?.text}</CenteredMessage>
        <DeleteComparisonButton onClick={handleDeleteComparison}>
          מחק השוואה
        </DeleteComparisonButton>
      </TitleAndDeleteArea>
      <Divider />
      <CompareTools>
        <ButtonsTooltip title="השוואת תמונות זו לצד זו">
          <ToolButton onClick={event => handleCompareClick(event)}>
            <CompareIcon />
          </ToolButton>
        </ButtonsTooltip>
        <Divider light={false} orientation="vertical" flexItem />
        <ButtonsTooltip title="פתיחת גלריית תמונות">
          <ToolButton onClick={handleGalleryClick}>
            <FullscreenIcon />
          </ToolButton>
        </ButtonsTooltip>
        <Divider light={false} orientation="vertical" flexItem />
        <ButtonsTooltip title="הסר כותרות מההשוואה">
          <ToolButton onClick={handleRemoveClick}>
            <DeleteIcon />
          </ToolButton>
        </ButtonsTooltip>
      </CompareTools>

      {isImageGalleryOpen && (
        <Lightbox
          images={images}
          onClose={() => dispatch(actions.setIsImageGalleryOpen(false))}
        />
      )}
      {isSideBySideComparisonOpen && (
        <SideBySideContainer onClick={event => event.stopPropagation()}>
          <StyledReactCompareImage
            leftImage={chosenImages[0]}
            rightImage={chosenImages[1]}
            sliderLineColor={'red'}
            sliderLineWidth={3}
          />
        </SideBySideContainer>
      )}
      {comparisonData?.headlines.length > 0 ? (
        <ComparisonTable comparisonData={comparisonData} />
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
  width: 95vw;
  margin: auto;
  height: 92vh;
`;

const CompareTools = styled.div`
  display: flex;
  width: 30vw;
  min-height: 3vh;
  margin: auto;
  justify-content: space-around;
  background: #d3d3d3;
  text-align: center;
`;

const ToolButton = styled(Button)`
  flex: 1 1 5vh;
  background: black;
  color: white;

  &:hover {
  }
`;

const SideBySideContainer = styled.div`
  width: 1536px;
  height: 754px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  border: 1px solid black;
  box-sizing: content-box;
`;

const StyledReactCompareImage = styled(ReactCompareImage)`
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  display: inline-block;
`;

const TitleAndDeleteArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CenteredMessage = styled.h1``;

const DeleteComparisonButton = styled(Button)`
  background: red;
  color: white;
  height: 4vh;
  font-size: 1rem;
  font-weight: 900;
  border: 0.5px solid black;

  &:hover {
    background: black;
  }
`;
