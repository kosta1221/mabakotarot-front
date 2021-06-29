/**
 *
 * Feed
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Container } from '@material-ui/core';
import { FeedItem } from './FeedItem';

interface Props {
  headlines?: Array<any>;
}

export function Feed(props: Props) {
  const { headlines } = props;

  const headlinesDuos = headlines?.reduce((rows, key, index) => {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

  // console.log(headlinesDuos);

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
