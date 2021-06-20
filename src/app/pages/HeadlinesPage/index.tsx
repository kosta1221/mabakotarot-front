/**
 *
 * HeadlinesPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import { useHeadlinesSlice } from './slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectHeadlines } from './slice/selectors';
import { useEffect } from 'react';

interface Props {}

export function HeadlinesPage(props: Props) {
  const { actions } = useHeadlinesSlice();
  const dispatch = useDispatch();
  const { headlines } = useSelector(selectHeadlines);

  useEffect(() => {
    dispatch(actions.sagaGetHeadlines());
  }, [dispatch, actions]);

  return (
    <>
      <span>Headlines</span>
      <Div>
        {headlines?.map((headline, i) => (
          <GridItem key={`headline-${i}`}>
            <Image src={headline.imageUrl} alt={`headline-${i}`} />
          </GridItem>
        ))}
      </Div>
    </>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  overflow-y: scroll;
`;
const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  border: 1.5px solid black;
  margin: 0.5vw;
`;

const Image = styled.img`
  height: auto;
  width: 40vw;
  align-self: center;
`;
