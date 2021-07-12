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
import { selectAppbar } from 'app/components/Appbar/slice/selectors';

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
    sites: sitesInState,
  } = useSelector(selectHeadlinesFeeds).headlineFeeds[index];

  const { showUniqueOnly } = useSelector(selectAppbar);

  const observer = useRef<IntersectionObserver>();
  const firstUpdate = useRef(true);

  useEffect(() => {
    sites && dispatch(headlinesFeedsActions.setOneFeedsSites({ index, sites }));
    if (firstUpdate.current) {
      return;
    }
    if (sitesInState.length > 0 && sites && sites[0] !== sitesInState[0]) {
      dispatch(headlinesFeedsActions.sagaFetchNewHeadlines(index));
    }
  }, [index, dispatch, sites, sitesInState]);

  useEffect(() => {
    // because we already have the useEffect below to trigger sagaGetHeadlinesInfiniteScroll on initial render, we don't want this effect which is supposed to refresh headlines to trigger on initial render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    window.scrollTo(0, 0);
    dispatch(headlinesFeedsActions.setOneFeedsPage({ index, page: 0 }));
    dispatch(
      headlinesFeedsActions.setOneFeedsLoadMoreHeadlines({
        index,
        loadMoreHeadlines: true,
      }),
    );
    dispatch(headlinesFeedsActions.sagaFetchNewHeadlines(index));
  }, [index, dispatch, showUniqueOnly]);

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
    countPerFetch != null &&
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
    dispatch(headlinesFeedsActions.sortOneFeedsHeadlines({ index, isSortAsc }));
  }, [index, dispatch, isSortAsc]);

  useEffect(() => {
    if (page > 0) {
      dispatch(headlinesFeedsActions.sagaGetHeadlinesInfiniteScroll(index));
    }
  }, [index, dispatch, page]);

  const lastItem = useCallback(
    element => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && loadMoreHeadlines) {
            if (page === 0) {
              dispatch(
                headlinesFeedsActions.incrementOneFeedsPageByAmount({
                  index,
                  amount: 2,
                }),
              );
            } else {
              dispatch(
                headlinesFeedsActions.incrementOneFeedsPageByAmount({
                  index,
                  amount: 1,
                }),
              );
            }
          }
        },
        { threshold: 1 },
      );

      if (element) {
        observer.current.observe(element);
      }
    },
    [index, dispatch, loadMoreHeadlines, page],
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
