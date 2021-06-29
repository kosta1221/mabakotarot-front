/**
 *
 * FeedItem
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Paper, Divider } from '@material-ui/core';

interface Props {
  itemData: any;
}

export function FeedItem(props: Props) {
  console.log(props.itemData);
  return (
    <Item>
      <StyledPaper elevation={3}>
        <PaperTitle>{props.itemData[0].date}</PaperTitle>
        <Divider />
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
  margin-bottom: 10px;
  padding-bottom: 3px;
`;

const Images = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const PaperTitle = styled.h3`
  direction: rtl;
`;

const Image = styled.img`
  height: auto;
  width: 20vw;
  align-self: center;
`;
