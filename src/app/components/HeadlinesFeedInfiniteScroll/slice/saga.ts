import { call, put, takeLatest, select } from 'redux-saga/effects';
import { headlinesFeedInfiniteScrollActions as actions } from '.';
import axios from 'axios';

import { selectHeadlinesFeedInfiniteScroll } from './selectors';

function* fetchHeadlinesWorkerSaga() {
  try {
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
    } = yield select(selectHeadlinesFeedInfiniteScroll);
    yield put(actions.setIsLoading(true));

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
      yield put(actions.setLoadMoreHeadlines(false));
    }
    yield put(actions.setHeadlines([...currentHeadlines, ...fetchedHeadlines]));

    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.log(e);
    yield put(actions.setItFetchError(true));
  }
}

export function* headlinesFeedInfiniteScrollSaga() {
  yield takeLatest(
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
