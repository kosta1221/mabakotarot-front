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
          <div key={`headline-${i}`}>
            <img src={headline.imageUrl} alt={`headline-${i}`} />
          </div>
        ))}
      </Div>
    </>
  );
}

const Div = styled.div``;
