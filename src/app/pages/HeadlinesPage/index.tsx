/**
 *
 * HeadlinesPage
 *
 */
import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { GridHeadlinePresentor } from '../../components/GridHeadlinePresentor';
import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll';

interface RouteParams {
  site: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export function HeadlinesPage(props: Props) {
  const { match } = props;

  return (
    <HeadlinesFeedInfiniteScroll site={match.params.site}>
      <GridHeadlinePresentor />
    </HeadlinesFeedInfiniteScroll>
  );
}
