import { call, put, takeLatest, select } from 'redux-saga/effects';
import { headlinesActions as actions } from '.';
import axios from 'axios';

import { selectHeadlines } from './selectors';

function* fetchHeadlinesWorkerSaga() {
  try {
    const { page, headlines: currentHeadlines } = yield select(selectHeadlines);
    yield put(actions.setIsLoading(true));

    const headlines = yield call(fetchHeadlines, page, 5);
    if (headlines.length === 0) {
      yield put(actions.setLoadMoreHeadlines(false));
    }
    yield put(actions.setHeadlines([...currentHeadlines, ...headlines]));

    yield put(actions.setIsLoading(false));
  } catch (e) {
    console.log(e);
    // yield put({ type: 'HEADLINES_FETCH_FAILED', message: e.message });
  }
}

export function* headlinesSaga() {
  yield takeLatest(actions.sagaGetHeadlines.type, fetchHeadlinesWorkerSaga);
}

const fetchHeadlines = async (page: Number, count: Number) => {
  const {
    data: { headlines },
  } = await axios({
    method: 'GET',
    url: `http://localhost:3001/api/headlines?page=${page}&count=${count}`,
  });
  console.log(headlines);
  return headlines;
};
