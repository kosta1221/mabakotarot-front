/**
 *
 * HeadlinesFeedInfiniteScroll
 *
 */
import * as React from 'react';

import { useEffect, useCallback, useRef } from 'react';

import { useHeadlinesFeedInfiniteScrollSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectHeadlinesFeedInfiniteScroll } from './slice/selectors';

interface Props {
  children?: React.ReactElement<any, any>;
  countPerFetch?: number;
  site?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isSingularFetch?: boolean;
}

export function HeadlinesFeedInfiniteScroll(props: Props) {
  const {
    children,
    site,
    countPerFetch,
    startDate,
    endDate,
    isSingularFetch,
  } = props;

  const { actions } = useHeadlinesFeedInfiniteScrollSlice();
  const dispatch = useDispatch();
  const {
    headlines,
    page,
    loadMoreHeadlines,
    isLoading,
    isSortAsc,
  } = useSelector(selectHeadlinesFeedInfiniteScroll);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    site && dispatch(actions.setSite(site));
  }, [dispatch, actions, site]);

  useEffect(() => {
    startDate && dispatch(actions.setStartDate(startDate));
  }, [dispatch, actions, startDate]);

  useEffect(() => {
    endDate && dispatch(actions.setEndDate(endDate));
  }, [dispatch, actions, endDate]);

  useEffect(() => {
    countPerFetch && dispatch(actions.setCountPerFetch(countPerFetch));
  }, [dispatch, actions, countPerFetch]);

  useEffect(() => {
    isSingularFetch && dispatch(actions.setIsSingularFetch(isSingularFetch));
  }, [dispatch, actions, isSingularFetch]);

  useEffect(() => {
    dispatch(actions.sagaGetHeadlinesInfiniteScroll());
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

  if (!children) {
    return null;
  }

  return (
    <>
      {React.cloneElement(children, {
        headlines,
        lastItem,
        isLoading,
        isSortAsc,
        handleToggleSortingorder,
      })}
    </>
  );
}
