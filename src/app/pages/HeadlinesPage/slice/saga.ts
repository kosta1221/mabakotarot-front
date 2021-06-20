import { call, put, takeLatest } from 'redux-saga/effects';
import { headlinesActions as actions } from '.';
import axios from 'axios';

function* doSomething() {
  try {
    const headlines = yield call(fetchHeadlines, 1, 15);
    yield put(actions.setHeadlines(headlines));
  } catch (e) {
    console.log(e);
    // yield put({ type: 'HEADLINES_FETCH_FAILED', message: e.message });
  }
}

export function* headlinesSaga() {
  yield takeLatest(actions.sagaGetHeadlines.type, doSomething);
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
