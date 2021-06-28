import { call, put, takeLatest, select } from 'redux-saga/effects';
import { headlinesFeedInfiniteScrollActions as actions } from '.';
import axios from 'axios';

import { selectHeadlinesFeedInfiniteScroll } from './selectors';

function* fetchHeadlinesWorkerSaga() {
  try {
    const { page, headlines: currentHeadlines, isSortAsc, site } = yield select(
      selectHeadlinesFeedInfiniteScroll,
    );
    yield put(actions.setIsLoading(true));

    const fetchedHeadlines = yield call(
      fetchHeadlines,
      page,
      5,
      isSortAsc,
      site,
    );

    if (fetchedHeadlines.length === 0) {
      yield put(actions.setLoadMoreHeadlines(false));
    }
    yield put(actions.setHeadlines([...currentHeadlines, ...fetchedHeadlines]));

    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.log(e);
    // yield put({ type: 'HEADLINES_FETCH_FAILED', message: e.message });
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
  site: string,
) => {
  const {
    data: { headlines },
  } = await axios({
    method: 'GET',
    url: `http://localhost:3001/api/headlines?page=${page}&count=${count}&isSortAsc=${isSortAsc}&site=${site}`,
  });
  console.log(headlines);
  return headlines;
};