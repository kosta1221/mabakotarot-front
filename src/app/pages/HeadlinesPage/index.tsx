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

interface RouteParams {
  site: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export function HeadlinesPage(props: Props) {
  const { params } = props.match;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { startDate, endDate, site, sites } = queryParams;
  const parsedSites =
    typeof sites === 'string' ? JSON.parse(sites.toString()) : '';
  console.log('parsed sites: ', parsedSites);

  return (
    <HeadlinesFeedInfiniteScroll
      countPerFetch={10}
      sites={
        (params.site &&
          (typeof params.site === 'string' ? [params.site] : [])) ||
        (parsedSites ? parsedSites : sites) ||
        (typeof site === 'string' ? [site] : null)
      }
      startDate={typeof startDate === 'string' ? startDate : null}
      endDate={typeof endDate === 'string' ? endDate : null}
    >
      <GridHeadlinePresentor />
    </HeadlinesFeedInfiniteScroll>
  );
}
