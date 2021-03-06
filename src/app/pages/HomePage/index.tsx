import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components/macro';

import { Helmet } from 'react-helmet-async';
import { HeadlineSliderPresentor } from '../../components/HeadlineSliderPresentor';
import { HeadlineBeltPresentor } from '../../components/HeadlineBeltPresentor';
import { sites } from 'utils/sites';
import { useSlidersSlice } from 'app/components/HeadlineSliderPresentor/slice';
import { useHeadlinesFeedsSlice } from 'app/components/HeadlinesFeedInfiniteScroll/slice';
import { useHomepageSlice } from './slice';
import { selectHomepage } from './slice/selectors';
import { useSelector } from 'react-redux';
import { currentLocalTime, startOfLocalDay } from 'utils/times';
import { HeadlinesFeedInfiniteScroll } from '../../components/HeadlinesFeedInfiniteScroll';

export function HomePage() {
  useSlidersSlice();
  useHeadlinesFeedsSlice();

  useHomepageSlice();
  const {
    slider1,
    slider2,
    slider1StartDate,
    slider1EndDate,
    slider2StartDate,
    slider2EndDate,
  } = useSelector(selectHomepage);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="App for comparing news headlines" />
      </Helmet>
      <HeadlinesFeedInfiniteScroll
        index={0}
        sites={sites}
        countPerFetch={5}
        startDate={startOfLocalDay}
        endDate={currentLocalTime}
        isSingularFetch={true}
      >
        <HeadlineBeltPresentor />
      </HeadlinesFeedInfiniteScroll>
      <Content>
        <Grid>
          <HeadlinesFeedInfiniteScroll
            index={1}
            sites={[slider1]}
            countPerFetch={0}
            startDate={slider1StartDate}
            endDate={slider1EndDate}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={0} />
          </HeadlinesFeedInfiniteScroll>

          <HeadlinesFeedInfiniteScroll
            index={2}
            sites={[slider2]}
            startDate={slider2StartDate}
            endDate={slider2EndDate}
            countPerFetch={0}
            isSingularFetch={true}
          >
            <HeadlineSliderPresentor index={1} />
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
  width: 93vw;
  height: 83vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
