/**
 *
 * ComparePage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import queryString from 'query-string';

import { useSelector } from 'react-redux';
import { selectDrawer } from '../../components/Drawer/slice/selectors';
import { useLocation } from 'react-router-dom';

interface Props {}

export function ComparePage(props: Props) {
  const { comparisons } = useSelector(selectDrawer);
  console.log(comparisons);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  console.log(location);

  const id = Number(queryParams.id);
  console.log(id);
  const comparisonData =
    comparisons?.length > 0
      ? comparisons.find(comparison => {
          return comparison.id === id;
        })
      : null;
  console.log(comparisonData);

  const compareDisplay = (
    <CompareContainer>
      <Title>{comparisonData?.text}</Title>
      {comparisonData?.headlines.map((headline, i) => {
        return (
          <HeadlinesContainer>
            <ItemContainer key={headline?._id}>
              <HeadlineOptions>
                <HeadlineTitle>{`${headline.date} ${headline._id.slice(
                  20,
                )}`}</HeadlineTitle>
              </HeadlineOptions>
              <Image src={headline.imageUrl} alt={`headline-${i}`} />
            </ItemContainer>
          </HeadlinesContainer>
        );
      })}
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
  justify-content: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
`;

const HeadlineOptions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const HeadlineTitle = styled.h3``;

const Image = styled.img`
  height: auto;
  max-width: 50%;
  align-self: center;
`;
