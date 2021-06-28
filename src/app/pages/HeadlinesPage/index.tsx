/**
 *
 * HeadlinesPage
 *
 */
import * as React from 'react';

import { RouteComponentProps, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { GridHeadlinePresentor } from '../../components/GridHeadlinePresentor';
import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll';

interface RouteParams {
  site: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export function HeadlinesPage(props: Props) {
  const { match } = props;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { startDate, endDate, site } = queryParams;
  console.log(queryParams);
  console.log(props);

  return (
    <HeadlinesFeedInfiniteScroll
      countPerFetch={10}
      site={match.params.site || (typeof site === 'string' ? site : null)}
      startDate={typeof startDate === 'string' ? startDate : null}
      endDate={typeof endDate === 'string' ? endDate : null}
    >
      <GridHeadlinePresentor />
    </HeadlinesFeedInfiniteScroll>
  );
}
