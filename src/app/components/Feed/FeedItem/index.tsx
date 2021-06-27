/**
 *
 * FeedItem
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Paper } from '@material-ui/core';

interface Props {
  itemData: any;
}

export function FeedItem(props: Props) {
  console.log(props.itemData);
  return (
    <Item>
      <StyledPaper elevation={3}>
        <PaperTitle>15:00</PaperTitle>
        <Images>
          <Image src={props.itemData[0].imageUrl} />
          <Image src={props.itemData[1].imageUrl} />
        </Images>
      </StyledPaper>
    </Item>
  );
}

const StyledPaper = styled(Paper)`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Images = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PaperTitle = styled.h3`
  direction: rtl;
`;

const Image = styled.img`
  height: auto;
  width: 30vw;
  align-self: center;
  border: 1px solid black;
`;
