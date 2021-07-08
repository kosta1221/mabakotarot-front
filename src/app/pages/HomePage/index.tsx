import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';

// import { Feed } from '../../components/Feed';
import { HeadlineSliderPresentor } from '../../components/HeadlineSliderPresentor';
import { GridHeadlinePresentor } from '../../components/GridHeadlinePresentor';

import { useSlidersSlice } from 'app/components/HeadlineSliderPresentor/slice';
import { useHeadlinesFeedsSlice } from 'app/components/HeadlinesFeedInfiniteScroll/slice';

import { currentLocalTime, startOfLocalDay } from 'utils/times';

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
            countPerFetch={0}
            startDate={startOfLocalDay}
            endDate={currentLocalTime}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={0} />
          </HeadlinesFeedInfiniteScroll>

          <HeadlinesFeedInfiniteScroll
            index={1}
            sites={['ynet']}
            startDate={startOfLocalDay}
            endDate={currentLocalTime}
            countPerFetch={0}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={1} />
          </HeadlinesFeedInfiniteScroll>

          <HeadlinesFeedInfiniteScroll
            index={2}
            sites={['walla']}
            countPerFetch={0}
            startDate={startOfLocalDay}
            endDate={currentLocalTime}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={2} />
          </HeadlinesFeedInfiniteScroll>

          <FrameForFeed>
            <HeadlinesFeedInfiniteScroll
              index={3}
              sites={['haaretz']}
              startDate={''}
              endDate={''}
              countPerFetch={5}
              isSingularFetch={true}
            >
              <GridHeadlinePresentor cols={1} />
            </HeadlinesFeedInfiniteScroll>
          </FrameForFeed>
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

const FrameForFeed = styled.div`
  height: 30vw;
  overflow-y: scroll;
`;
