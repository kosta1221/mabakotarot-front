/**
 *
 * Feed
 *
 */
import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Container } from '@material-ui/core';
import { FeedItem } from './FeedItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectHomepage } from '../../pages/HomePage/slice/selectors';
import { homepageActions } from '../../pages/HomePage/slice';

interface Props {}

export function Feed(props: Props) {
  const dispatch = useDispatch();
  const { homepageFeedHeadlines } = useSelector(selectHomepage);

  const headlinesDuos = homepageFeedHeadlines.reduce(function (
    rows,
    key,
    index,
  ) {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  },
  []);

  // console.log(headlinesDuos);

  useEffect(() => {
    dispatch(homepageActions.sagaGetHomePageHeadlines());
  }, [dispatch]);
  return (
    <StyledContainer>
      <Title>פיד החדשות:</Title>
      {headlinesDuos?.map((itemData, i) => {
        return <FeedItem itemData={itemData} key={i} />;
      })}
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
`;

const Title = styled.h1`
  direction: rtl;
`;
