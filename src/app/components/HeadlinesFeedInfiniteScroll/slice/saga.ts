import { call, put, takeEvery, select } from 'redux-saga/effects';
import { headlinesFeedsActions as actions } from '.';
import axios from 'axios';

import { selectHeadlinesFeeds } from './selectors';

function* fetchHeadlinesWorkerSaga(action) {
  const index = action.payload;

  try {
    const allHeadlineFeeds = yield select(selectHeadlinesFeeds);

    const {
      page,
      countPerFetch,
      headlines: currentHeadlines,
      isSortAsc,
      sites,
      startDate,
      endDate,
      isSingularFetch,
      search,
    } = yield allHeadlineFeeds.headlineFeeds[index];

    yield put(actions.setOneFeedsIsLoading({ index, isLoading: true }));

    const fetchedHeadlines = yield call(
      fetchHeadlines,
      isSingularFetch ? 1 : page,
      countPerFetch,
      isSortAsc,
      sites,
      startDate,
      endDate,
      search,
    );

    if (isSingularFetch || fetchedHeadlines.length === 0) {
      yield put(
        actions.setOneFeedsLoadMoreHeadlines({
          index,
          loadMoreHeadlines: false,
        }),
      );
    }

    // console.log('current headlines: ', currentHeadlines);
    // console.log('fetched headlines: ', fetchedHeadlines);

    yield put(
      actions.setOneFeedsHeadlines({
        index,
        headlines: [...currentHeadlines, ...fetchedHeadlines],
      }),
    );

    yield put(actions.setOneFeedsIsLoading({ index, isLoading: false }));
  } catch (e) {
    console.log(e);
    yield put(actions.setOneFeedsIsFetchError({ index, isFetchError: true }));
  }
}

export function* headlinesFeedInfiniteScrollSaga() {
  yield takeEvery(
    actions.sagaGetHeadlinesInfiniteScroll.type,
    fetchHeadlinesWorkerSaga,
  );
}

const fetchHeadlines = async (
  page: Number,
  count: Number,
  isSortAsc: boolean,
  sites: string[],
  startDate: string,
  endDate: string,
  search: string,
) => {
  const sitesStringEncoded = encodeURIComponent(JSON.stringify(sites));

  const sitesQuery = sites.length > 0 ? `&sites=${sitesStringEncoded}` : '';
  const startDateQuery = startDate ? `&startDate=${startDate}` : '';
  const endDateQuery = endDate ? `&endDate=${endDate}` : '';
  const searchQuery = search ? `&search=${search}` : '';

  console.log(sitesQuery, startDateQuery, endDateQuery, searchQuery);

  const {
    data: { headlines },
  } = await axios({
    method: 'GET',
    url: `http://localhost:3001/api/headlines?page=${page}&count=${count}&isSortAsc=${isSortAsc}${sitesQuery}${startDateQuery}${endDateQuery}${searchQuery}`,
  });

  console.log('headlines fetched: ', headlines);
  return headlines;
};
