import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Feed } from '../../components/Feed';
import { HeadlineSliderPresentor } from '../../components/HeadlineSliderPresentor';

import { useSlidersSlice } from 'app/components/HeadlineSliderPresentor/slice';

import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll';

export function HomePage() {
  useSlidersSlice();

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="App for comparing news headlines" />
      </Helmet>
      <Content>
        {/* <HeadlinesFeedInfiniteScroll countPerFetch={6} isSingularFetch={true}>
          <Feed />
        </HeadlinesFeedInfiniteScroll> */}
        <HeadlinesFeedInfiniteScroll
          sites={['n12']}
          countPerFetch={30}
          isSingularFetch={true}
        >
          <HeadlineSliderPresentor index={0} />
        </HeadlinesFeedInfiniteScroll>
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80vw;
  min-height: 100vh;
`;
