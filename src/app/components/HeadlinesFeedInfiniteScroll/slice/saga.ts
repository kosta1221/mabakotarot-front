import { call, put, takeEvery, select } from 'redux-saga/effects';
import { headlinesFeedsActions as actions } from '.';
import axios from 'axios';

import { selectHeadlinesFeeds } from './selectors';
import { selectAppbar } from 'app/components/Appbar/slice/selectors';

function* fetchHeadlinesWorkerSaga(action) {
  const index = action.payload;

  try {
    const { showUniqueOnly } = yield select(selectAppbar);
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
      showUniqueOnly,
    );

    if (isSingularFetch || fetchedHeadlines.length === 0) {
      yield put(
        actions.setOneFeedsLoadMoreHeadlines({
          index,
          loadMoreHeadlines: false,
        }),
      );
    }

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

function* fetchNewHeadlinesWorkerSaga(action) {
  const index = action.payload;

  try {
    const { showUniqueOnly } = yield select(selectAppbar);
    const allHeadlineFeeds = yield select(selectHeadlinesFeeds);

    const {
      page,
      countPerFetch,
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
      showUniqueOnly,
    );

    if (isSingularFetch || fetchedHeadlines.length === 0) {
      yield put(
        actions.setOneFeedsLoadMoreHeadlines({
          index,
          loadMoreHeadlines: false,
        }),
      );
    }

    yield put(
      actions.setOneFeedsHeadlines({
        index,
        headlines: fetchedHeadlines,
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

  yield takeEvery(
    actions.sagaFetchNewHeadlines.type,
    fetchNewHeadlinesWorkerSaga,
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
  unique: boolean = false,
) => {
  const sitesStringEncoded = encodeURIComponent(JSON.stringify(sites));

  const sitesQuery = sites.length > 0 ? `&sites=${sitesStringEncoded}` : '';
  const startDateQuery = startDate ? `&startDate=${startDate}` : '';
  const endDateQuery = endDate ? `&endDate=${endDate}` : '';
  const searchQuery = search ? `&search=${search}` : '';
  const uniqueQuery = unique ? `&unique=${unique}` : '';

  // console.log(sitesQuery, startDateQuery, endDateQuery, searchQuery);

  const {
    data: { headlines },
  } = await axios({
    method: 'GET',
    url: `https://3.68.107.158/api/headlines?page=${page}&count=${count}&isSortAsc=${isSortAsc}${sitesQuery}${startDateQuery}${endDateQuery}${searchQuery}${uniqueQuery}`,
  });

  console.log('headlines fetched for sites: ', sites, headlines);
  return headlines;
};
