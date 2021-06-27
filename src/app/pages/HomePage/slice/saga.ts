import { call, put, takeLatest } from 'redux-saga/effects';
import { homepageActions as actions } from '.';
import axios from 'axios';

function* fetchHeadlinesWorkerSaga() {
  try {
    // const { head } = yield select(
    //   selectHomepage,
    // );
    // yield put(actions.setIsLoading(true));

    const fetchedHeadlines = yield call(fetchHeadlines, 1, 6, false);

    yield put(actions.setHomePageHeadlines(fetchedHeadlines));

    // yield put(actions.setIsLoading(false));
  } catch (e) {
    console.log(e);
    // yield put({ type: 'HEADLINES_FETCH_FAILED', message: e.message });
  }
}

export function* homePageSaga() {
  yield takeLatest(
    actions.sagaGetHomePageHeadlines.type,
    fetchHeadlinesWorkerSaga,
  );
}

const fetchHeadlines = async (
  page: Number,
  count: Number,
  isSortAsc: boolean,
) => {
  const {
    data: { headlines },
  } = await axios({
    method: 'GET',
    url: `http://localhost:3001/api/headlines?page=${page}&count=${count}&isSortAsc=${isSortAsc}`,
  });
  console.log(headlines);
  return headlines;
};
