/**
 *
 * HeadlinesFeedInfiniteScroll
 *
 */
import * as React from 'react';

import { useEffect, useCallback, useRef } from 'react';

import { headlinesFeedsActions, initialSingleHeadlineFeedState } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectHeadlinesFeeds } from './slice/selectors';

interface Props {
  index: number;
  children?: React.ReactElement<any, any>;
  countPerFetch?: number;
  sites?: string[] | null;
  startDate?: string | null;
  endDate?: string | null;
  isSingularFetch?: boolean;
  search?: string | null;
}

export function HeadlinesFeedInfiniteScroll(props: Props) {
  const {
    index,
    children,
    sites,
    countPerFetch,
    startDate,
    endDate,
    isSingularFetch,
    search,
  } = props;

  const dispatch = useDispatch();
  const allHeadlineFeeds = useSelector(selectHeadlinesFeeds).headlineFeeds;

  if (index > allHeadlineFeeds.length - 1) {
    console.log('ayo');
    dispatch(
      headlinesFeedsActions.addHeadlineFeed(initialSingleHeadlineFeedState),
    );
  }

  const {
    headlines,
    page,
    loadMoreHeadlines,
    isLoading,
    isSortAsc,
    isFetchError,
  } = useSelector(selectHeadlinesFeeds).headlineFeeds[index];

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    sites && dispatch(headlinesFeedsActions.setOneFeedsSites({ index, sites }));
  }, [index, dispatch, sites]);

  useEffect(() => {
    startDate &&
      dispatch(
        headlinesFeedsActions.setOneFeedsStartDate({ index, startDate }),
      );
  }, [index, dispatch, startDate]);

  useEffect(() => {
    endDate &&
      dispatch(headlinesFeedsActions.setOneFeedsEndDate({ index, endDate }));
  }, [index, dispatch, endDate]);

  useEffect(() => {
    countPerFetch &&
      dispatch(
        headlinesFeedsActions.setOneFeedsCountPerFetch({
          index,
          countPerFetch,
        }),
      );
  }, [index, dispatch, countPerFetch]);

  useEffect(() => {
    isSingularFetch &&
      dispatch(
        headlinesFeedsActions.setOneFeedsIsSingularFetch({
          index,
          isSingularFetch,
        }),
      );
  }, [index, dispatch, isSingularFetch]);

  useEffect(() => {
    search &&
      dispatch(headlinesFeedsActions.setOneFeedsSearch({ index, search }));
  }, [index, dispatch, search]);

  useEffect(() => {
    dispatch(headlinesFeedsActions.sagaGetHeadlinesInfiniteScroll(index));
  }, [index, dispatch, page]);

  useEffect(() => {
    dispatch(headlinesFeedsActions.sortOneFeedsHeadlines({ index, isSortAsc }));
  }, [index, dispatch, isSortAsc]);

  const lastItem = useCallback(
    element => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && loadMoreHeadlines) {
            dispatch(
              headlinesFeedsActions.incrementOneFeedsPageByAmount({
                index,
                amount: 1,
              }),
            );
          }
        },
        { threshold: 1 },
      );

      if (element) {
        observer.current.observe(element);
      }
    },
    [index, dispatch, loadMoreHeadlines],
  );

  const handleToggleSortingorder = e => {
    dispatch(headlinesFeedsActions.toggleOneFeedsIsSortAsc(index));
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
        startDate,
        endDate,
        sites,
        isFetchError,
        handleToggleSortingorder,
      })}
    </>
  );
}
