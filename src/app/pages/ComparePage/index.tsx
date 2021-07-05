/**
 *
 * ComparePage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector } from 'react-redux';
import { selectDrawer } from '../../components/Drawer/slice/selectors';
import { drawerActions } from '../../components/Drawer/slice';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {}

export function ComparePage(props: Props) {
  const { comparisons } = useSelector(selectDrawer);
  const dispatch = useDispatch();
  console.log(comparisons);
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
    console.log(headline);
    console.log(event.currentTarget.id);
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

  const compareDisplay = (
    <CompareContainer>
      <Title>{comparisonData?.text}</Title>
      <HeadlinesContainer>
        {comparisonData?.headlines.map((headline, i) => {
          return (
            <ItemContainer key={`${headline.id}-${i}`}>
              <CloseButton
                id={headline._id}
                onClick={handleRemoveClick(headline)}
              >
                <CloseIcon fontSize="large" />
              </CloseButton>
              <HeadlineText>{headline.date}</HeadlineText>
              <Image src={headline.imageUrl} alt={`headline-${i}`} />
              <Divider />
              <HeadlineText>{headline.titleText}</HeadlineText>
              <ArticleLink href={headline.titleArticleLink} target="_blank">
                קישור לכתבה
              </ArticleLink>
            </ItemContainer>
          );
        })}
      </HeadlinesContainer>
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

const HeadlinesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0.5vw;
  flex: 0 1 25%;
`;

const CloseButton = styled.div`
  align-self: flex-start;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const ArticleLink = styled.a``;

const HeadlineText = styled.h3``;

const Divider = styled.hr`
  margin-top: 30px;
  width: 100%;
`;

const Image = styled.img`
  max-width: 100%;
`;
