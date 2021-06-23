/**
 *
 * HeadlinesPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Loader from 'react-loader-spinner';

import { useHeadlinesSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectHeadlines } from './slice/selectors';
import { useEffect, useCallback, useRef } from 'react';

interface Props {}

export function HeadlinesPage(props: Props) {
  const { actions } = useHeadlinesSlice();
  const dispatch = useDispatch();
  const {
    headlines,
    page,
    loadMoreHeadlines,
    isLoading,
    isSortAsc,
  } = useSelector(selectHeadlines);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    dispatch(actions.sagaGetHeadlines());
  }, [dispatch, actions, page]);

  useEffect(() => {
    dispatch(actions.sortHeadlines(isSortAsc));
  }, [dispatch, actions, isSortAsc]);

  const lastItem = useCallback(
    element => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && loadMoreHeadlines) {
            dispatch(actions.incrementPageByAmount(1));
          }
        },
        { threshold: 1 },
      );

      if (element) {
        observer.current.observe(element);
      }
    },
    [dispatch, actions, loadMoreHeadlines],
  );

  const handleToggleSortingorder = e => {
    dispatch(actions.toggleIsSortAsc());
  };

  return (
    <>
      <span onClick={handleToggleSortingorder}>{`Headlines sorted by: ${
        isSortAsc ? 'ascending' : 'descending'
      } order`}</span>
      <Grid>
        {headlines?.map((headline, i) => {
          return (
            <GridItem
              ref={headlines.length === i + 1 ? lastItem : null}
              key={headline._id}
            >
              <p>{`${headline.date} ${headline._id.slice(20)}`}</p>
              <Image src={headline.imageUrl} alt={`headline-${i}`} />
            </GridItem>
          );
        })}
      </Grid>
      {isLoading ? (
        <CenteredLoader type="Oval" color="#00BFFF" height={80} width={80} />
      ) : null}
    </>
  );
}

const Grid = styled.div`
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

const CenteredLoader = styled(Loader)`
  display: flex;
  justify-content: center;
`;
