/**
 *
 * HeadlinesPage
 *
 */
import * as React from 'react';

import { RouteComponentProps, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { GridHeadlinePresentor } from '../../components/GridHeadlinePresentor';
import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll/Loadable';
import { useHeadlinesFeedsSlice } from 'app/components/HeadlinesFeedInfiniteScroll/slice';

interface RouteParams {
  site: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export function HeadlinesPage(props: Props) {
  const { params } = props.match;
  useHeadlinesFeedsSlice();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { startDate, endDate, site, sites, search } = queryParams;
  const parsedSites =
    typeof sites === 'string' ? JSON.parse(sites.toString()) : '';
  console.log('parsed sites: ', parsedSites);

  return (
    <HeadlinesFeedInfiniteScroll
      index={0}
      countPerFetch={10}
      sites={
        (params.site &&
          (typeof params.site === 'string' ? [params.site] : [])) ||
        (parsedSites ? parsedSites : sites) ||
        (typeof site === 'string' ? [site] : null)
      }
      startDate={typeof startDate === 'string' ? startDate : null}
      endDate={typeof endDate === 'string' ? endDate : null}
      search={typeof search === 'string' ? search : null}
    >
      <GridHeadlinePresentor />
    </HeadlinesFeedInfiniteScroll>
  );
}
