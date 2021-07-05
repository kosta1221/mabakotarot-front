import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
// import { Feed } from '../../components/Feed';
import { HeadlineSliderPresentor } from '../../components/HeadlineSliderPresentor';

import { useSlidersSlice } from 'app/components/HeadlineSliderPresentor/slice';
import { useHeadlinesFeedsSlice } from 'app/components/HeadlinesFeedInfiniteScroll/slice';

import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll';

export function HomePage() {
  useSlidersSlice();
  useHeadlinesFeedsSlice();

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
        <Grid>
          <HeadlinesFeedInfiniteScroll
            index={0}
            sites={['n12']}
            countPerFetch={10}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={0} />
          </HeadlinesFeedInfiniteScroll>

          <HeadlinesFeedInfiniteScroll
            index={1}
            sites={['ynet']}
            countPerFetch={10}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={1} />
          </HeadlinesFeedInfiniteScroll>

          <HeadlinesFeedInfiniteScroll
            index={2}
            sites={['walla']}
            countPerFetch={10}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={2} />
          </HeadlinesFeedInfiniteScroll>
        </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  /* overflow-y: scroll; */
`;
